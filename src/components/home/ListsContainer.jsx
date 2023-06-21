const ListsContainer = ({ currentList, setList, list }) => {
  return (
    <div className="lists-container">
      <ul>
        {list.map((item,i) => {

          const dataValue = Object.keys(item)[0];
          const title = Object.values(item)[0];
      
          return (
            <li key={i}
              onClick={() => setList(dataValue)}
              className={currentList === dataValue ? "active" : ""}
        >
          {title}
        </li>
          )
        })}

      </ul>
    </div>
  );
};

export default ListsContainer;
