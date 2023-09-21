
// the component that displays the search history
export default function SearchHistory({queriesHistory, setQueriesHistory, setQuery, handleSubmit}) {

    const historyRows = queriesHistory.map((query, i) => {
        return(
            <li key={i} className="list-group-item d-flex">
                <a onClickCapture={() => setQuery(query)}
                   onClick={handleSubmit}>{query}</a>
                <a onClickCapture={() => setQueriesHistory([...queriesHistory.slice(0, i), ...queriesHistory.slice(i+1)])}
                   className="ms-auto">delete</a>
            </li>
        )
    });

    return (
        <>
            <div className="card mt-1">
                <ul className="list-group list-group-flush">
                    {historyRows}
                </ul>
            </div>
            <a onClick={() => setQueriesHistory([])} className="text-danger">clear history</a>
        </>

    );
}