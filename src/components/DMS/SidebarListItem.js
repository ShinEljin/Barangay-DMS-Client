function SidebarListItem({ item, icon, className, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`hover:bg-[#ffffff50]  hover:rounded-l-3xl hover:cursor-pointer p-[0.7rem] ${className} |  2xl:p-[1rem]`}
    >
      <span className="icon mr-6 invisible | md:visible">{icon}</span>
      <span className="icon-text md:invisible md:absolute | xl:static xl:visible">
        {item}
      </span>
    </li>
  );
}

export default SidebarListItem;
