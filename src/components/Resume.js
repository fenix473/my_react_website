import {useState, useEffect} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "../css/Resume.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const resumePdf = `${process.env.PUBLIC_URL}/CV.pdf`;

// Hook to get responsive PDF width
function usePdfWidth() {
    const [width, setWidth] = useState(Math.min(600, window.innerWidth - 40));
    
    useEffect(() => {
        function handleResize() {
            setWidth(Math.min(600, window.innerWidth - 40));
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return width;
}

function Resume() {
    const [showResume, setShowResume] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const pdfWidth = usePdfWidth();

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    function handleClose() {
        setShowResume(false);
        setNumPages(null);
    }

    // Show resume PDF viewer
    if (showResume) {
        return (
            <div className="resume-viewer">
                <button className="resume-back-button" onClick={handleClose}>
                    ← Close Resume
                </button>
                <h2 className="resume-title">My Resume</h2>
                <div className="resume-pdf-container">
                    <Document file={resumePdf} onLoadSuccess={onDocumentLoadSuccess}>
                        {numPages && Array.from({length: numPages}, (_, index) => (
                            <Page key={index + 1} pageNumber={index + 1} width={pdfWidth} />
                        ))}
                    </Document>
                </div>
                {numPages && <p className="resume-page-count">{numPages} page{numPages > 1 ? 's' : ''}</p>}
            </div>
        );
    }

    // Show button
    return (
        <div className="resume-section">
            <button 
                className="resume-button"
                onClick={() => setShowResume(true)}
            >
                📄 View Resume
            </button>
        </div>
    );
}

export default Resume;