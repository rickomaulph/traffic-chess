import React from 'react';
import { PieceData } from '../types/gameTypes';
import { trafficSigns } from '../data/trafficSigns';

interface SquareProps {
  row: number;
  col: number;
  isBlack: boolean;
  piece: PieceData | null;
  sign?: string;
  isSelected: boolean;
  isValidMove: boolean;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ 
  isBlack, 
  piece, 
  sign, 
  isSelected, 
  isValidMove, 
  onClick 
}) => {
  let bgColor = isBlack 
    ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
    : 'bg-gradient-to-br from-white to-blue-50';
  
  if (isSelected) {
    bgColor = 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-400/50';
  } else if (isValidMove) {
    bgColor = isBlack 
      ? 'bg-gradient-to-br from-green-900/70 to-green-800/70' 
      : 'bg-gradient-to-br from-green-200/90 to-green-100/90';
  }

  const pieceColor = piece?.player === 'A' 
    ? 'text-red-600 [filter:drop-shadow(0_0_6px_rgba(220,38,38,0.7))]' 
    : 'text-blue-600 [filter:drop-shadow(0_0_6px_rgba(37,99,235,0.7))]';


  return (
    <div 
      className={`${bgColor} aspect-square w-full h-full min-w-10 min-h-10 relative flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-inner hover:shadow-blue-200/30`}
      onClick={onClick}
    >
      {/* Traffic sign (on white squares) */}
      {!isBlack && sign && (
        <div className="absolute inset-1 flex items-center justify-center">
          <img 
            src={`/traffic-chess/icon traffic/${trafficSigns.findIndex(s => s.id === sign) + 1}.png`}
            alt={trafficSigns.find(s => s.id === sign)?.name || 'Traffic Sign'}
            className="w-16 h-16 object-contain opacity-90 drop-shadow-md transition-transform duration-300 hover:scale-110"
          />
        </div>
      )}

      {/* Piece (traffic cone) */}
      {piece && (
        <div 
          className={`${pieceColor} ${isSelected ? 'animate-highlight [box-shadow:inset_0_0_12px_2px_rgba(255,255,255,0.8)]' : ''} z-10 ring-2 ring-white/50 hover:[filter:drop-shadow(0_0_8px_currentColor)]`}
          style={{ 
            width: '70%', 
            height: '70%', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="w-full h-full hover:scale-110 transition-transform duration-200"
          >
            <path d="M4.5,19.5h15v2h-15V19.5z M10.23,7.83C9.6,5.9,9,4,9,4h6c0,0-0.6,1.9-1.23,3.83L10.23,7.83z M19.84,18.5H4.16
              l0.88-3.03C5.44,14.09,6.74,13,8.19,13h7.63c1.45,0,2.75,1.09,3.15,2.47L19.84,18.5z M15.05,11.15
              c-0.14,0.76-0.26,1.42-0.35,1.85h-5.4c-0.09-0.43-0.21-1.09-0.35-1.85c-0.38-2.01-0.83-4.39-1.09-5.7h8.27
              C15.88,6.76,15.43,9.14,15.05,11.15z" />
          </svg>
        </div>
      )}

      {/* Valid move indicator */}
      {isValidMove && !piece && (
        <div className="absolute w-1/3 h-1/3 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-inner shadow-green-200/50 animate-pulse"></div>
      )}
    </div>
  );
};

export default Square;
