export default function Link({ href, children }) {

    function onClick(e) {
        if(e.ctrlKey || e.metaKey) return null;
        e.preventDefault();
        window.history.pushState({}, '', href);
        const linkEvent = new PopStateEvent('popstate');
        window.dispatchEvent(linkEvent);
    }

    return <a onClick={onClick} href={href} >{children}</a>
}