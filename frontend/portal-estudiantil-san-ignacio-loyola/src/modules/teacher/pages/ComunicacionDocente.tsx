import React, { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { Send, MessageSquare, User, Mail as MailIcon, CheckCircle, XCircle } from 'lucide-react'; // Added CheckCircle, XCircle
import { Modal } from '@/shared/components/Modal'; // Import the Modal component
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Message {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
  type: 'sent' | 'received';
}

const mockMessages: Message[] = [
  {
    id: 'tmsg1',
    sender: 'Padre de Sofía Rodríguez',
    recipient: 'Prof. Ana García',
    subject: 'Consulta sobre Calificaciones de Sofía',
    body: 'Estimada Profesora, me gustaría conversar sobre las últimas calificaciones de Sofía en Matemáticas. ¿Podríamos agendar una reunión?',
    date: '2025-11-03',
    read: false,
    type: 'received',
  },
  {
    id: 'tmsg2',
    sender: 'Prof. Ana García',
    recipient: 'Administración',
    subject: 'Solicitud de Materiales para Laboratorio',
    body: 'Estimada Administración, solicito la compra de materiales para las prácticas de laboratorio de Química.',
    date: '2025-11-01',
    read: true,
    type: 'sent',
  },
  {
    id: 'tmsg3',
    sender: 'Administración',
    recipient: 'Prof. Ana García',
    subject: 'Re: Solicitud de Materiales para Laboratorio',
    body: 'Estimada Profesora, su solicitud ha sido aprobada. Los materiales llegarán la próxima semana.',
    date: '2025-11-02',
    read: true,
    type: 'received',
  },
];

export const ComunicacionDocente = () => {
  const [subject, setSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [recipient, setRecipient] = useState('Administración'); // Default recipient
  const [messages, setMessages] = useState(mockMessages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null);
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (type: typeof modalType, message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setModalMessage('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !messageBody || !recipient) {
      openModal('error', 'Por favor, complete todos los campos.');
      return;
    }

    const newMessage: Message = {
      id: `tmsg${messages.length + 1}`,
      sender: 'Prof. Ana García',
      recipient: recipient,
      subject: subject,
      body: messageBody,
      date: format(new Date(), 'yyyy-MM-dd', { locale: es }),
      read: true,
      type: 'sent',
    };

    setMessages([...messages, newMessage]);
    setSubject('');
    setMessageBody('');
    setRecipient('Administración'); // Reset recipient
    openModal('success', 'Mensaje enviado con éxito!');
  };

  const renderModalContent = () => {
    return (
      <div className="flex flex-col items-center justify-center text-center p-4">
        {modalType === 'success' && <CheckCircle className="w-16 h-16 text-green-500 mb-4" />}
        {modalType === 'error' && <XCircle className="w-16 h-16 text-red-500 mb-4" />}
        <p className="text-lg text-neutral-700">{modalMessage}</p>
      </div>
    );
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'success': return 'Éxito';
      case 'error': return 'Error';
      default: return '';
    }
  };

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Comunicación</h1>

      {/* Send Message Form */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2">Enviar Nuevo Mensaje</h2>
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-neutral-700 mb-1">
              Destinatario:
            </label>
            <select
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="Administración">Administración</option>
              <option value="Padre de Sofía Rodríguez">Padre de Sofía Rodríguez</option>
              <option value="Sofía Rodríguez">Sofía Rodríguez (Estudiante)</option>
              {/* Add more dynamic recipients based on courses/students */}
            </select>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
              Asunto:
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <div>
            <label htmlFor="messageBody" className="block text-sm font-medium text-neutral-700 mb-1">
              Mensaje:
            </label>
            <textarea
              id="messageBody"
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-5 rounded-full font-semibold hover:bg-opacity-90 transition flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Enviar Mensaje
          </button>
        </form>
      </div>

      {/* Message History */}
      <div>
        <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2">Historial de Mensajes</h2>
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-xl shadow-sm border ${
                  msg.type === 'received' ? 'bg-blue-50 border-blue-200' : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg text-primary">{msg.subject}</span>
                  <span className="text-sm text-neutral-500">{msg.date}</span>
                </div>
                <p className="text-sm text-neutral-600 mb-2">
                  {msg.type === 'received' ? `De: ${msg.sender}` : `Para: ${msg.recipient}`}
                </p>
                <p className="text-neutral-800">{msg.body}</p>
              </div>
            ))
          ) : (
            <p className="text-neutral-600 text-lg col-span-full text-center py-10">No hay mensajes en el historial.</p>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={getModalTitle()}
        hideFooter={true} // Hide footer for simple success/error messages
      >
        {renderModalContent()}
      </Modal>
    </Card>
  );
};