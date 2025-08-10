// components/StarRating.tsx
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number; 
}

export default function StarRating({ rating }: StarRatingProps) {

  const ratingOutOf5 = rating / 2;


  const stars = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;

    
    if (ratingOutOf5 >= starNumber) {
  
      return <FaStar key={index} />;
    } else if (ratingOutOf5 >= starNumber - 0.5) {
    
      return <FaStarHalfAlt key={index} />;
    } else {

      return <FaRegStar key={index} />;
    }
  });

  return (
    <div className="flex items-center gap-2">
      <div className="flex text-yellow-500">{stars}</div>
      <span className="text-white font-bold text-lg">
  
      </span>
    </div>
  );
}