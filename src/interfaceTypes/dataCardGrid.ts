import { DocumentType } from './documentType'
export interface CardGridProps {
    cards: DocumentType[];
    setCards: React.Dispatch<React.SetStateAction<DocumentType[]>>;
}
