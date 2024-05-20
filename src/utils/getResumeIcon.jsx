export function getResumeIcon(extension) {
    switch (extension) {
        case "pdf":
            return (
                <img src="/assets/images/pdf.png" alt="pdf" className="w-8" />
            );
        case "doc":
            return (
                <img src="/assets/images/docs.png" alt="docs" className="w-8" />
            );
        case "docx":
            return (
                <img
                    src="/assets/images/docx-file.png"
                    alt="pdf"
                    className="w-8"
                />
            );
        default:
            return <img src="/assets/images/pdf.png" className="w-8" />;
    }
}
