import React from 'react';

const ComplexityControls = ({ complexity, onUpdateComplexity }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateComplexity(name, value);
  };
  
  // Calculer la complexité globale (0-100%)
  const globalComplexity = ((complexity.length + complexity.detail + complexity.twist) / 30) * 100;

  return (
    <div>
      <div className="row g-4">
        <div className="col-md-4">
          <label htmlFor="length" className="form-label d-flex justify-content-between align-items-center">
            <span>Longueur</span>
            <span className="complexity-badge">{complexity.length}</span>
          </label>
          <input 
            type="range" 
            className="form-range" 
            id="length" 
            name="length"
            min="1" 
            max="10" 
            value={complexity.length}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="detail" className="form-label d-flex justify-content-between align-items-center">
            <span>Niveau de détail</span>
            <span className="complexity-badge">{complexity.detail}</span>
          </label>
          <input 
            type="range" 
            className="form-range" 
            id="detail" 
            name="detail"
            min="1" 
            max="10" 
            value={complexity.detail}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="twist" className="form-label d-flex justify-content-between align-items-center">
            <span>Rebondissements</span>
            <span className="complexity-badge">{complexity.twist}</span>
          </label>
          <input 
            type="range" 
            className="form-range" 
            id="twist" 
            name="twist"
            min="1" 
            max="10" 
            value={complexity.twist}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="mt-4">
        <label className="form-label text-muted fs-6">Complexité globale</label>
        <div className="complexity-meter">
          <div id="complexity-fill" style={{ width: `${globalComplexity}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default ComplexityControls;