const NextButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="next-btn" onClick={onClick}>
      <svg
        width="30"
        height="36"
        viewBox="0 0 30 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 18L4.45043e-07 35.3205L3.19526e-08 0.679491L30 18Z"
          fill="var(--primary-color)"
        />
      </svg>
    </div>
  );
};

export default NextButton;
