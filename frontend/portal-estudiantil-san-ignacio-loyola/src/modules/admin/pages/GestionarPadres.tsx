import { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { User, Phone, Edit, Trash2, PlusCircle, Search } from 'lucide-react';
import { Modal } from '@/shared/components/Modal';
import useParents from '@/shared/hooks/useParents';
import type { ParentDto, ParentCreationDto, ParentUpdateDto } from '@/shared/types/parent.types';
import { toast } from 'react-toastify'; // Import toast

export const GestionarPadres = () => {
  const {
    parents,
    isLoadingParents,
    parentsError,
    createParentMutation,
    updateParentMutation,
    deleteParentMutation,
  } = useParents();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedParent, setSelectedParent] = useState<ParentDto | null>(null);

  const [formUserId, setFormUserId] = useState<number | ''>('');
  const [formContactNumber, setFormContactNumber] = useState('');

  const filteredParents = (parents || []).filter(parent => {
    const matchesSearch = parent.contactNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const openModal = (type: typeof modalType, parent?: ParentDto) => {
    setModalType(type);
    setSelectedParent(parent || null);
    if (parent) {
      setFormUserId(parent.userId);
      setFormContactNumber(parent.contactNumber || '');
    } else {
      setFormUserId('');
      setFormContactNumber('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedParent(null);
    setFormUserId('');
    setFormContactNumber('');
  };

  const handleConfirmAction = async () => {
    if (!selectedParent && modalType !== 'create') {
      toast.error('Error: No parent selected for this action.');
      return;
    }

    try {
      switch (modalType) {
        case 'create':
          { if (formUserId === '') {
            toast.error('User ID is required.');
            return;
          }
          const newParent: ParentCreationDto = {
            userId: Number(formUserId),
            contactNumber: formContactNumber,
          };
          await createParentMutation.mutateAsync(newParent);
          toast.success('Padre creado exitosamente.');
          break; }
        case 'edit':
          if (selectedParent?.id) {
            const updatedParent: ParentUpdateDto = {
              id: selectedParent.id,
              userId: Number(formUserId),
              contactNumber: formContactNumber,
            };
            await updateParentMutation.mutateAsync({ id: selectedParent.id, parent: updatedParent });
            toast.success('Padre actualizado exitosamente.');
          }
          break;
        case 'delete':
          if (selectedParent?.id) {
            await deleteParentMutation.mutateAsync(selectedParent.id);
            toast.success('Padre eliminado exitosamente.');
          }
          break;
        default:
          break;
      }
      closeModal();
    } catch (e: unknown) {
      toast.error(`Error: ${ (e as Error).message || 'Ocurrió un error.'}`);
    }
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'create':
      case 'edit':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">ID de Usuario Asociado</label>
              <input type="number" value={formUserId} onChange={(e) => setFormUserId(Number(e.target.value))} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Número de Contacto</label>
              <input type="text" value={formContactNumber} onChange={(e) => setFormContactNumber(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
          </form>
        );
      case 'delete':
        return (
          <p>¿Estás seguro de que quieres eliminar al padre con ID **{selectedParent?.id}**?</p>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'create': return 'Crear Nuevo Padre';
      case 'edit': return `Editar Padre: ${selectedParent?.id}`;
      case 'delete': return 'Confirmar Eliminación';
      default: return '';
    }
  };

  if (isLoadingParents) {
    return <Card className="p-6 text-center">Cargando padres...</Card>;
  }

  if (parentsError) {
    return <Card className="p-6 text-center text-red-500">Error: {parentsError.message}</Card>;
  }

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Gestionar Padres</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por número de contacto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => openModal('create')}
            className="bg-primary text-white py-2 px-4 rounded-full font-semibold flex items-center gap-2 hover:bg-opacity-90 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Nuevo Padre
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-primary">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ID de Usuario
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Número de Contacto
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {filteredParents.length > 0 ? (
              filteredParents.map(parent => (
                <tr key={parent.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    {parent.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    <User className="w-4 h-4 inline-block mr-2 text-primary" /> {parent.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    <Phone className="w-4 h-4 inline-block mr-2 text-accent" />{parent.contactNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openModal('edit', parent)} className="text-indigo-600 hover:text-indigo-900 transition">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => openModal('delete', parent)} className="text-red-600 hover:text-red-900 transition">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-neutral-600">No se encontraron padres.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={getModalTitle()}
        onConfirm={handleConfirmAction}
        onCancel={closeModal}
        confirmText={modalType === 'delete' ? 'Eliminar' : 'Guardar'}
        cancelText="Cancelar"
      >
        {renderModalContent()}
      </Modal>
    </Card>
  );
};