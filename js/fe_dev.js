mermaid.initialize({
    startOnLoad: false,
    cloneCssStyles: false
});

function renderGraph() {
    var graph = document.querySelector('#container > slide.current div._todo');
    if(!graph) {
        return;
    }
    graph.classList.add('mermaid');
    graph.classList.remove('_todo');
    mermaid.init();
}