function Card({ title, number, icon, className }) {
  return (
    <div
      className={`bg-white flex flex-col justify-between p-8 rounded-2xl h-44 ${className}`}
    >
      <div className="flex justify-between">
        {icon}
        <div>
          <h1 className="text-lg">{title.toUpperCase()}</h1>
        </div>
      </div>
      <div className="flex justify-end mt-[-4rem]">
        <p className="text-3xl font-bold">{number}</p>
      </div>
      <div>
        <p className="text-sm">Total {title}</p>
      </div>
    </div>
  );
}

export default Card;
