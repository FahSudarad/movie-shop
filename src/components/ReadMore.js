//function ReadMore
import React from "react";

function ReadMore({ text, maxLength, isReadMore, toggleReadMore }) {
  const content = isReadMore ? text : text.slice(0, maxLength);

  return (
    <div>
      <div>{content}</div>
      {!isReadMore && text.length > maxLength && (
        <>
          <br />
          <button onClick={toggleReadMore} className="text-[#1976d2]">
            Read More...
          </button>
        </>
      )}
      {isReadMore && (
        <button onClick={toggleReadMore} className="text-[#1976d2]">
          Show Less
        </button>
      )}
    </div>
  );
}

export default ReadMore;
