import "./frame.css";

const Frame = ({ children }) => {
    return (
        <div className="frame-container">
            <div className="frame-content">{children}</div>
        </div>
    );
};

export default Frame;
