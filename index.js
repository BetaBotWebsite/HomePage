function contentFunction(type,title,link){
    var html = ""
    html += "<a href=\""+link+"\">"
    html += "<div class=\"Card card p-2 mb-2\">" 
    html += "<p class=\"lead text-dark m-0\">"
    html += "<span class=\"Type rounded bg-dark h6 text-white pt-1 pb-1 pl-2 pr-2 mb-0 ml-2 mr-2\">"
    html += type
    html += "</span>"
    html += title
    html += "</p>"
    return html
}
function pageFunction(index){
    var html = ""
    html += "<li id=\"Page-"+index+"\" class=\"page-item\" onclick=\"handleClick("+index+")\">"
    html += "<a class=\"page-link text-dark\">"
    html += index+1
    html += "</a>"
    html += "</li>"
    return html
}
function handleClick(index){
    $(".page").addClass("d-none")
    $(".Page-"+index).removeClass("d-none")
    $(".page-item").removeClass("active")
    $("#Page-"+index).addClass("active")
}
$(document).ready(function () {
    let pages = []
    let itemPerPage = 8
    $.getJSON('https://betabotwebsite.github.io/Data/Papers.json', function (json) {
        for (i = 0; i < json.length / itemPerPage; i++) {
            let page = []
            for (j = 0 + i * itemPerPage; j < (i + 1) * itemPerPage; j++) {
                if (json[j] === undefined) {
                    break
                }
                page.push(json[j])
            }
            pages.push(page)
        }
        pages.forEach((page,index) => {
            $(".Content").append("<div class=\"Page-"+index+" page d-none\">"+"</div>")
            page.forEach((item) => {
                $(".Page-"+index).append(contentFunction(item.type,item.title,item.link))
            })
            $(".pagination").append(pageFunction(index))
        })
        // Initialize 
        $(".Page-0").removeClass("d-none")
        $("#Page-0").addClass("active")
        $("#Page-0").addClass("ml-auto")
    })
})
