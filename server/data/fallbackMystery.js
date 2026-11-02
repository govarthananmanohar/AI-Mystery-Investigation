export const fallbackMystery = {
  title: 'The Last Light at Bellweather',
  setting: 'Bellweather House, a clifftop hotel closed for the winter. At 9:40 PM, owner Elias Vale was found unconscious in the locked archive. The lighthouse key and a page from his ledger are missing.',
  briefing: 'A storm cut Bellweather House off from the road. Four people were inside when the archive alarm sounded. Elias is recovering, but he remembers only the sound of the old brass clock stopping.',
  suspects: [
    { id: 'mara', name: 'Mara Quinn', role: 'Hotel manager', age: 38, motive: 'Elias planned to sell the hotel, ending the job she had built her life around.', description: 'Knows every service corridor and keeps the master key ring.', alibi: 'Claims she was checking the generator in the basement.' },
    { id: 'owen', name: 'Owen Vale', role: 'Nephew & caretaker', age: 29, motive: 'A disputed inheritance and mounting debts put him at odds with Elias.', description: 'Returned to Bellweather three days ago after years away.', alibi: 'Says he was on the veranda calling a solicitor.' },
    { id: 'dr-lin', name: 'Dr. Saira Lin', role: 'Family physician', age: 44, motive: 'Elias had threatened to expose a falsified research grant she once signed.', description: 'Was the first to reach Elias after the alarm.', alibi: 'Was in the kitchen preparing his evening tonic.' },
    { id: 'felix', name: 'Felix Ward', role: 'Night porter', age: 52, motive: 'Elias refused to pay Felix for years of unpaid overtime.', description: 'A former locksmith who still carries a leather tool roll.', alibi: 'Was at the front desk watching the storm.' },
  ],
  evidence: [
    { id: 'note', type: 'Document', icon: 'file', title: 'A torn ledger page', location: 'Archive doorway', content: 'The page lists a transfer at 9:15 PM, but the ink is still wet. A faint blue carbon smudge marks the edge. The missing amount is written as “£18,000”.' },
    { id: 'messages', type: 'Messages', icon: 'message', title: 'Messages on Elias’s tablet', location: 'Study', content: 'Mara: “The west clock is five minutes slow, as usual.” Elias: “Leave the archive key where we agreed.” Sent at 8:52 PM. No reply appears.' },
    { id: 'clock', type: 'Photo', icon: 'image', title: 'The stopped clock', location: 'Archive', content: 'A photograph taken by the doctor shows the brass clock stopped at 9:20. A tiny blue fiber is caught beneath its glass rim. The clock is wound from the rear.' },
    { id: 'footage', type: 'CCTV', icon: 'video', title: 'Service corridor camera', location: 'West corridor', content: 'At 9:17 PM, a figure in a rain-darkened manager’s coat enters the archive corridor carrying a tray. The camera clock runs five minutes fast. The figure exits empty-handed at 9:29.' },
    { id: 'witness', type: 'Witness', icon: 'eye', title: 'Felix’s observation', location: 'Front desk', content: 'Felix says the generator never failed. He heard the basement door close at 9:12, then saw Mara come upstairs with dry sleeves. The storm had already soaked the veranda.' },
    { id: 'key', type: 'Object', icon: 'key', title: 'The archive key ring', location: 'Kitchen', content: 'The master ring was found beside a tonic glass. One key is missing. A trace of blue carbon dust is ground into the leather fob.' },
  ],
  culpritId: 'mara',
  solution: 'Mara staged the generator check as her alibi, then used her master key to enter the archive with a tonic tray. The corridor camera clock was five minutes fast: the figure entered at 9:12, exactly when Felix heard the basement door. She stopped the clock to make the attack appear later, took the ledger page to conceal the transfer, and returned with a blue carbon smudge from the copy ledger. The blue fiber caught in the clock matches the thread in her manager’s coat.',
  hint: 'Compare the clocks before trusting anyone’s timeline. Which alibi depends on a door, and who had the key?',
};
