import { marked } from "marked";

const ChatResponse = ({ response }) => {
    if (!response) return null;

    const { candidates = [], usageMetadata = {} } = response;

    return (
        <div className="container my-4">
            <h3>Response</h3>
            {candidates.map((candidate, index) => {
                const rawText = candidate.content?.parts?.[0]?.text || "";
                const html = marked.parse(rawText);

                return (
                    <div className="card mb-3" key={index}>
                        <div className="card-body">
                            <h5 className="card-title">Candidate {index + 1}</h5>

                            {/* Render parsed HTML safely */}
                            <div
                                className="card-text"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />

                            {/* Citations if available */}
                            {candidate.citationMetadata?.citationSources?.length > 0 && (
                                <>
                                    <h6>Citations:</h6>
                                    <ul>
                                        {candidate.citationMetadata.citationSources.map((source, idx) => (
                                            <li key={idx}>
                                                <a
                                                    href={source.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {source.url}
                                                </a>{" "}
                                                (Indexes: {source.startIndex}-{source.endIndex})
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}

            <h4>Usage Metadata</h4>
            <p>Prompt Tokens: {usageMetadata.promptTokenCount || 0}</p>
            <p>Response Tokens: {usageMetadata.candidatesTokenCount || 0}</p>
            <p>Total Tokens: {usageMetadata.totalTokenCount || 0}</p>
        </div>
    );
};

export default ChatResponse;
