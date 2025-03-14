import React from 'react';
import { SETTINGS, OBJECTS, ERAS, PLOT_TYPES, THEMES } from '../data/constants';

const StorySettings = ({ settings, genre, onUpdateSettings }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateSettings(name, value);
  };

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <label htmlFor="setting" className="form-label">Cadre</label>
        <select 
          id="setting" 
          name="setting"
          className="form-select"
          value={settings.setting}
          onChange={handleChange}
        >
          <option value="">Choisir un cadre ou laisser aléatoire</option>
          {(SETTINGS[genre] || SETTINGS.adventure).map((setting, index) => (
            <option key={index} value={setting}>{setting}</option>
          ))}
        </select>
      </div>
      <div className="col-md-6">
        <label htmlFor="object" className="form-label">Objet clé</label>
        <select 
          id="object" 
          name="object"
          className="form-select"
          value={settings.object}
          onChange={handleChange}
        >
          <option value="">Choisir un objet ou laisser aléatoire</option>
          {(OBJECTS[genre] || OBJECTS.adventure).map((object, index) => (
            <option key={index} value={object}>{object}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="era" className="form-label">Époque</label>
        <select 
          id="era" 
          name="era"
          className="form-select"
          value={settings.era}
          onChange={handleChange}
        >
          {ERAS.map(era => (
            <option key={era.value} value={era.value}>{era.text}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="plotType" className="form-label">Type d'intrigue</label>
        <select 
          id="plotType" 
          name="plotType"
          className="form-select"
          value={settings.plotType}
          onChange={handleChange}
        >
          {PLOT_TYPES.map(plotType => (
            <option key={plotType.value} value={plotType.value}>{plotType.text}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="theme" className="form-label">Thème principal</label>
        <select 
          id="theme" 
          name="theme"
          className="form-select"
          value={settings.theme}
          onChange={handleChange}
        >
          {THEMES.map(theme => (
            <option key={theme.value} value={theme.value}>{theme.text}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StorySettings;