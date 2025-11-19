interface AvatarProps {
  name: string;
  imageUrl?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string; // Added className explicitly
  onClick?: () => void; // Added onClick explicitly if needed
}

/**
 * Genera las iniciales a partir de un nombre completo.
 * Toma la primera letra del primer y último nombre.
 * @param {string} name - El nombre completo.
 * @returns {string} Las iniciales en mayúsculas.
 */
const getInitials = (name: string): string => {
  if (!name) return "?";
  const words = name.split(" ").filter(Boolean);
  if (words.length === 0) return "?";
  const firstInitial = words[0][0];
  if (words.length > 1) {
    const lastInitial = words[words.length - 1][0];
    return `${firstInitial}${lastInitial}`.toUpperCase();
  }
  return firstInitial.toUpperCase();
};

/**
 * Un componente de Avatar circular y reutilizable que muestra la imagen de un usuario
 * o un fallback con sus iniciales.
 */
export const Avatar = ({
  name,
  imageUrl,
  size = "md",
  className,
  onClick, // Destructure onClick
}: AvatarProps) => {
  const initials = getInitials(name);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
  };

  const baseClasses =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full";

  return (
    <div
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      onClick={onClick} // Pass onClick to the div
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Avatar de ${name}`}
          className="h-full w-full object-cover text-center"
        />
      ) : (
        <span
          className="font-semibold text-white"
          style={{ backgroundColor: "#9CA3AF" }}
        >
          {initials}
        </span>
      )}
    </div>
  );
};