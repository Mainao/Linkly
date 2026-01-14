import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    isDark?: boolean;
}

const Card = ({ children, className = "" }: CardProps) => {
    return (
        <div
            className={`
                backdrop-blur-xl 
                border 
                rounded-2xl 
                transition-all 
                duration-300
                bg-white/40 border-black/5 text-neutral-900 shadow-sm
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default Card;
