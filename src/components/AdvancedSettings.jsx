import React from 'react';
import { POVS, TONES } from '../data/constants';

const AdvancedSettings = ({ settings, onUpdateSettings }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateSettings(name, value);
  };

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <label htmlFor="pov" className="form-label">Point de vue</label>
        <select 
          id="pov" 
          name="pov"
          className="form-select"
          value={settings.pov}
          onChange={handleChange}
        >
          {POVS.map(pov => (
            <option key={pov.value} value={pov.value}>{pov.text}</option>
          ))}
        </select>
      </div>
      <div className="col-md-6">
        <label htmlFor="tone" className="form-label">Ton</label>
        <select 
          id="tone" 
          name="tone"
          className="form-select"
          value={settings.tone}
          onChange={handleChange}
        >
          {TONES.map(tone => (
            <option key={tone.value} value={tone.value}>{tone.text}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AdvancedSettings;