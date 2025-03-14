import React from 'react';

const StoryOutput = ({ story, onShowNotification }) => {
  const copyStoryToClipboard = () => {
    navigator.clipboard.writeText(story.content)
      .then(() => {
        onShowNotification('Histoire copiée dans le presse-papier!', 'success');
      })
      .catch(() => {
        onShowNotification('Impossible de copier l\'histoire', 'error');
      });
  };

  const printStory = () => {
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
        <head>
          <title>Histoire générée</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .story-header { background-color: #f0f0f0; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
            h3 { margin-top: 0; }
            .story-meta { font-style: italic; color: #666; }
            .story-content { line-height: 1.6; }
            .story-content p:first-of-type::first-letter { font-size: 3em; float: left; line-height: 0.8; margin-right: 0.1em; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="story-header">
            <h3>${story.title}</h3>
            <div class="story-meta">
              <div>${story.setting}</div>
              <div>${story.era}</div>
            </div>
          </div>
          <div class="story-content">
            ${story.content}
          </div>
        </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    } else {
      onShowNotification('Impossible d\'ouvrir la fenêtre d\'impression', 'error');
    }
  };

  const saveStory = () => {
    const element = document.createElement('a');
    const file = new Blob([story.content], {type: 'text/plain'});
    
    element.href = URL.createObjectURL(file);
    element.download = 'histoire-generee.txt';
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    onShowNotification('Histoire sauvegardée!', 'success');
  };

  return (
    <div className="story-container">
      <div className="story-header">
        <h3>{story.title}</h3>
        <div className="story-meta">
          <span><i className="fas fa-map-marker-alt"></i> {story.setting}</span>
          <span><i className="fas fa-history"></i> {story.era}</span>
        </div>
      </div>
      <div className="story-content" dangerouslySetInnerHTML={{ __html: story.content }}></div>
      <div className="story-actions">
        <button 
          className="btn btn-outline-primary story-action-btn"
          onClick={copyStoryToClipboard}
        >
          <i className="fas fa-copy"></i> Copier
        </button>
        <button 
          className="btn btn-outline-secondary story-action-btn"
          onClick={printStory}
        >
          <i className="fas fa-print"></i> Imprimer
        </button>
        <button 
          className="btn btn-outline-success story-action-btn"
          onClick={saveStory}
        >
          <i className="fas fa-download"></i> Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default StoryOutput;