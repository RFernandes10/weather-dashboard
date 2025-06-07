function UnitToggle({ unit, setUnit }) {
  return (
    <div className="flex bg-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setUnit('metric')}
        className={`py-3 px-4 font-semibold transition-all ${
          unit === 'metric' ? 'bg-[#64ffda] text-black' : 'text-white hover:bg-gray-600'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => setUnit('imperial')}
        className={`py-3 px-4 font-semibold transition-all ${
          unit === 'imperial' ? 'bg-[#64ffda] text-black' : 'text-white hover:bg-gray-600'
        }`}
      >
        °F
      </button>
    </div>
  );
}

export default UnitToggle;