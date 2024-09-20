export default function TimeSelection({
    value,
    onChange, // Function to call when the value changes, this is a prop
    // a prop is a value that is passed to a component
  }: {
    value: string; // The current value
    onChange: (value: string) => void; 
    // Function to call when the value changes
}) {
    const times =['00:00']; 
    for (let i = 1; i < 24; i++) {
        // Add the time to the array in the format HH:MM
        times.push(`${i}:00`); 
        times.push(`${i}:30`);
    }

    return (
        <select value={value} onChange={ev => onChange(ev.target.value) } >
            {times.map((time) =>
            (<option key={time} value={time}>{time}</option>))}
        </select>
    );
}