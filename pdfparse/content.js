// only took 2 days :0
// pdfjsLib = (async () => {
//     const src = chrome.runtime.getURL("pdfparse/pdf.js");
//     // const pdfjsLib = await import(src);
//     return await import(src);
// })();

// Idc anymore
pdfjsLib = (async () => {
    const src = chrome.runtime.getURL("pdfparse/pdf.js");
    const worker = chrome.runtime.getURL("pdfparse/pdf.worker.js");
    // pdfjsLib.GlobalWorkerOptions.workerSrc = worker;
    // const pdfjsLib = await import(src);
    return await import(src);
})().then((pdfjsLib) => {

    // console.log(pdfjsLib);
    // return pdfjsLib;
    pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("pdfparse/pdf.worker.js");
    const pdfUrl = window.location.href; // Use the current URL or a PDF-specific URL
    let data;
    if (pdfUrl.endsWith(".pdf")) {
        data = parsePDF(pdfUrl);
    }
    console.log(data);
    console.log(data['wordsOnPage']);
    // pdfjsLib.GlobalWorkerOptions.workerSrc = worker;
    // parse();
});


function parsePDF(pdfUrl) {
    console.log("Parsing PDF:", pdfUrl);
    pdfjsLib.getDocument(pdfUrl).promise.then(function (pdfDocument) {
        const numPages = pdfDocument.numPages;
        // console.log(`Total pages: ${numPages}`);

        let wordCount = 0;
        // let wordsPerPage = [];
        let wordsOnPage = {};

        // Loop through each page and extract words
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            pdfDocument.getPage(pageNum).then(function (page) {
                page.getTextContent().then(function (textContent) {
                    let text = textContent.items.map(item => item.str).join(' ');
                    let wordCountOnPage = text.split(/\s+/).length;
                    // console.log(wordCountOnPage);
                    wordCount += wordCountOnPage;
                    // wordsPerPage.push(wordCountOnPage);
                    wordsOnPage[pageNum] = wordCountOnPage;

                    // console.log(`Page ${pageNum}: ${wordCountOnPage} words`);
                });
            });
        }

        // console.log(`Total word count: ${wordCount}`);
        // console.log(`Words per page: ${JSON.stringify(wordsPerPage)}`);
        // console.log(`Words on each page: ${JSON.stringify(wordsOnPage)}`);
        return { "wordCount":wordCount,  "wordsOnPage":wordsOnPage };
    }).catch(function (error) {
        console.error("Error parsing PDF:", error);
    });
}

// pdfjsLib = (async () => {
//     const src = chrome.runtime.getURL("pdfparse/pdf.js");
//     // const pdfjsLib = await import(src);
//     return await import(src);
// })().then((pdfjsLib) => {
//     console.log(pdfjsLib);
//     return pdfjsLib;

// });

// function parse() {
// const pdfUrl = window.location.href; // Use the current URL or a PDF-specific URL
// let data;
// if (pdfUrl.endsWith(".pdf")) {
//     data = parsePDF(pdfUrl);
// }
// console.log(data);
// // console.log(pdfjsLib);
// }


