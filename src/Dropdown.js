import "./Dropdown.css";

export default function Dropdown( { options, selected, setSelected, open, setOpen } ) {
    const onOptionSelected = (e) => {
        setOpen(false);
        const selectedOption = options.find(option => option.value === e.target.dataset.value);
        setSelected(selectedOption);
    }

    let debounce;
    let searchTerm = '';
    function onKeyboardInput(e) {
        switch(e.code) {
            case "Space":
            case "Enter":
                setOpen(!open);
                break;
            case "ArrowUp":
                const prevOption = options[options.indexOf(selected) - 1];
                if(prevOption) setSelected(prevOption);
                break;
            case "ArrowDown":
                const nextOption = options[options.indexOf(selected) + 1];
                if(nextOption) setSelected(nextOption);
                break;
            default:
                clearTimeout(debounce);
                searchTerm += e.key;
                debounce = setTimeout(() => {
                    searchTerm = ''
                }, 500);

                if(searchTerm) {
                    const foundOption = options.find(option => option.label.toLowerCase().startsWith(searchTerm.toLowerCase()));
                    if(foundOption) setSelected(foundOption)
                }
        }
    }

    const renderedList = options.map(option => {
        if(selected.value === "null" && option.value === "null") return null;
        return <li onClick={(e) => onOptionSelected(e)} data-value={option.value} key={option.value} className={`custom-dropdown-option ${selected.value === option.value? 'selected' : ''}`}>{option.label}</li>
    })


    return (
        <>
        <div onBlur={() => setOpen(false)} onKeyDown={onKeyboardInput} tabIndex='0' className='custom-dropdown-wrapper'>
            <span onClick={() => setOpen(!open)} className='custom-dropdown-label'>{selected.label}</span>
            <ul className={`custom-dropdown-options ${open ? 'show' : ''}`}>
                {renderedList}
            </ul>
        </div>
        </>
    )
}