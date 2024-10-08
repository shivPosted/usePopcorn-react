import { useState } from 'react';
import PropTypes from 'prop-types';

const styleContainer = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  // backgroundColor: '#2A3335',
  // padding: '16px 12px',
  // maxWidth: '20%',
  // borderRadius: '9px',
  // color: '#fff',
  // justifyContent: 'center',
};

const styleStarContainer = {
  display: 'flex',
  gap: '3px',
};

const styleRatingNum = {
  lineHeight: '1',
  margin: '0',
  display: 'flex',
  alignItems: 'center',
  // justifyContent: 'center',
  textAlign: 'center',
  fontWeight: '700',
  fontSize: '20px',
  fontFamily: 'sans-serif',
};

StarComponent.propTypes = {
  maxLength: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  ratingString: PropTypes.array,
  onSetRating: PropTypes.func,
  defaultRating: PropTypes.number,
};

export default function StarComponent({
  maxLength = 5,
  size = 24,
  color = '#FFD700',
  ratingString = [],
  onSetRating = () => {},
  defaultRating = 0,
}) {
  const [starCount, setStarCount] = useState(defaultRating);
  const [tempStarCount, setTempStarCount] = useState(0);

  function handleClick(value) {
    setStarCount(cur => (cur === value ? 0 : value));
    onSetRating(cur => (cur === value ? 0 : value));
  }
  return (
    <div className="container" style={styleContainer}>
      <div
        className="star-container"
        style={styleStarContainer}
        onMouseLeave={() => setTempStarCount(0)}
      >
        {Array.from({ length: maxLength }, (_, i) => {
          return (
            <Star
              color={color}
              size={size}
              full={tempStarCount ? tempStarCount >= i + 1 : starCount >= i + 1}
              key={i + 1}
              handleMouseEnter={() => {
                setTempStarCount(i + 1);
              }}
              // handleMouseLeave={() => setTempStarCount(0)}
              handleClick={() => handleClick(i + 1)}
            />
          );
        })}
      </div>
      <p
        className="ratings"
        style={{
          ...styleRatingNum,
          opacity: starCount || tempStarCount ? '100%' : '0',
          width: '16px',
          height: '16px',
          color: color,
        }}
      >
        {ratingString.length === 0
          ? tempStarCount || starCount
          : ratingString[tempStarCount ? tempStarCount - 1 : starCount - 1]}
      </p>
    </div>
  );
}

function Star({ handleClick, full, handleMouseEnter, size, color }) {
  const styleStar = {
    width: `${size}px`,
    height: `${size}px`,
    cursor: 'pointer',
  };
  return (
    <svg
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      xmlns="http://www.w3.org/2000/svg"
      fill={full ? color : 'none'}
      viewBox="0 0 24 24"
      stroke={color}
      style={styleStar}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

export function Test() {
  const [displayRating, setDisplayRating] = useState(0);
  return (
    <div className="container">
      <StarComponent onSetRating={setDisplayRating} />
      <p>This product has been rated {displayRating} stars</p>
    </div>
  );
}

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>

*/
