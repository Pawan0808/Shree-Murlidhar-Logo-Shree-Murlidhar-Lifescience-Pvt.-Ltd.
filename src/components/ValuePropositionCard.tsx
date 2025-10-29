import React from 'react';
import { useInView } from '../hooks/useInView';

interface ValuePropositionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

export const ValuePropositionCard: React.FC<ValuePropositionCardProps> = ({ icon: Icon, title, description, index }) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`healthcare-card border-black p-6 transform transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: inView ? `${index * 150}ms` : '0ms' }}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
