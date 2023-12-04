import React from 'react';

const TermsOfUse = ({ paragraphs, onAccept }) => (
  <div>
    <h2>Terms of Use</h2>
    <ol>
      {paragraphs.map((paragraph) => (
        <li key={paragraph.index}>
          <h3>{paragraph.title}</h3>
          <p>{paragraph.content}</p>
        </li>
      ))}
    </ol>
    <button onClick={onAccept}>Accept</button>
  </div>
);

export default TermsOfUse;
