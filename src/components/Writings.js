import {useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import orangeManPdf from "../assets/writings/Orange Man.pdf";
import SubjugationPdf from "../assets/writings/Subjugation of Nature.pdf";
import ProfessionPdf from "../assets/writings/Editable ENG II_ Initial.pdf";
import Mores from "../assets/writings/Copy of Research Essay.pdf";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Essay collection with titles and files
const essays = [
    { title: "Orange Man", file: orangeManPdf },
    { title: "Subjugation of Nature", file: SubjugationPdf },
    { title: "Professional Writing", file: ProfessionPdf },
    { title: "Research Essay", file: Mores }
];

function Writings() {

    const [numPages, setNumPages] = useState(null);
    const [selectedEssay, setSelectedEssay] = useState(null);

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    function handleBack() {
        setSelectedEssay(null);
        setNumPages(null);
    }

    // Show essay selection if none selected
    if (!selectedEssay) {
        return (
            <div>
                <h1>Writings</h1>
                <p style={{ color: "#aaa", marginBottom: "2rem" }}>Select an essay to read:</p>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    maxWidth: "400px",
                    margin: "0 auto"
                }}>
                    {essays.map((essay, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedEssay(essay)}
                            style={{
                                padding: "1rem 1.5rem",
                                fontSize: "1rem",
                                backgroundColor: "#1a1a2e",
                                color: "#eaeaea",
                                border: "1px solid #333",
                                borderRadius: "8px",
                                cursor: "pointer",
                                transition: "all 0.2s ease"
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#16213e";
                                e.target.style.borderColor = "#00d9ff";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#1a1a2e";
                                e.target.style.borderColor = "#333";
                            }}
                        >
                            {essay.title}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Show selected essay
    return (
        <div>
            <h1>Writings</h1>
            <button
                onClick={handleBack}
                style={{
                    padding: "0.5rem 1rem",
                    marginBottom: "1rem",
                    backgroundColor: "#16213e",
                    color: "#00d9ff",
                    border: "1px solid #00d9ff",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                ← Back to list
            </button>
            <h2 style={{ color: "#00d9ff", marginBottom: "1rem" }}>{selectedEssay.title}</h2>
            <div style={{
                maxHeight: "70vh",
                overflowY: "auto",
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "1rem",
                margin: "0 auto",
                width: "fit-content"
            }}>
                <Document file={selectedEssay.file} onLoadSuccess={onDocumentLoadSuccess}>
                    {numPages && Array.from({length: numPages}, (_, index) => (
                        <Page key={index + 1} pageNumber={index + 1} width={600} />
                    ))}
                </Document>
            </div>
            <p>{numPages} pages</p>
        </div>
    );
}

export default Writings;