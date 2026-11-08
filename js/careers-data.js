/**
 * DATA LOWONGAN — Nowl Vision Games
 * Dipakai oleh careers.html (daftar) dan career_detail.html (detail).
 *
 * Menambah lowongan : salin satu blok { ... } di bawah, tempel di dalam array,
 *                     lalu ganti isinya. Pisahkan antar-blok dengan koma.
 *                     `id` harus unik, huruf kecil, pakai tanda hubung
 *                     (dipakai di URL: career_detail.html?id=<id>).
 * Mengedit lowongan : ubah nilainya langsung di blok terkait.
 * Menghapus lowongan: hapus seluruh blok { ... } beserta komanya. Kalau array
 *                     kosong, halaman menampilkan pesan "belum ada lowongan".
 *
 * contract   : Internship | Freelance | Full-time | Part-time | Contract
 * datePosted : format YYYY-MM-DD (daftar otomatis urut dari yang terbaru)
 * applyUrl   : ganti '#' dengan link Google Form lowongan tersebut
 * Pilihan dropdown filter terisi otomatis dari department, division, dan contract.
 */
window.NVG_JOBS = [
  {
    id: 'game-tester-intern',
    title: 'Game Tester Intern',
    department: 'Quality',
    division: 'Porting',
    contract: 'Internship',
    datePosted: '2026-11-08',
    responsibilities: [
      'Play through builds of Nowl Vision Games titles and follow structured test plans.',
      'Find, reproduce, and document bugs with clear steps, screenshots, or video.',
      'Check performance, controls, and save data across target PC configurations.',
      'Report on pacing, puzzle clarity, and horror moments that do not land as intended.',
      'Verify fixes and run regression tests before each new build goes out.'
    ],
    requirements: [
      'Currently studying or recently graduated; any major is welcome.',
      'Enjoys horror games and can play them for extended sessions.',
      'Careful, patient, and able to write clear reports in English or Indonesian.',
      'Owns a PC able to run Unreal Engine games at medium settings.',
      'Available at least 20 hours per week for three months.'
    ],
    benefits: [
      'Fully remote work with flexible hours.',
      'Hands-on experience in an indie horror game production.',
      'Mentoring from the Nowl Vision Games development team.',
      'Internship certificate and a credit in the games you help test.'
    ],
    howToApply: 'Interested in joining Nowl Vision Games? This is a remote position. Click the Apply Now button below and complete the application form, and tell us about the horror game that scared you the most.',
    applyUrl: '#'
  },
  {
    id: 'freelance-2d-game-artist',
    title: 'Freelance 2D Game Artist',
    department: 'Art',
    division: 'Full Development Cycle',
    contract: 'Freelance',
    datePosted: '2026-11-01',
    responsibilities: [
      'Create 2D concept art for characters, spirits, and environments inspired by Indonesian folklore.',
      'Produce in-game 2D assets such as textures, UI elements, posters, and collectible documents.',
      'Prepare promotional art for store pages and social media.',
      'Work with the game design team to keep a consistent, unsettling visual style.',
      'Revise work based on feedback and deliver organized source files on schedule.'
    ],
    requirements: [
      'A portfolio showing strong 2D illustration or concept art.',
      'Proficient in Photoshop, Clip Studio Paint, Krita, or similar tools.',
      'Comfortable with dark, horror-themed subject matter.',
      'Interest in Indonesian culture, myths, and urban legends.',
      'Reliable communication and the ability to meet agreed deadlines.'
    ],
    benefits: [
      'Fully remote, project-based collaboration.',
      'Paid per agreed milestone.',
      'Creative input on the look of an original horror title.',
      'Official credit in the game and permission to show approved work in your portfolio.'
    ],
    howToApply: 'Want to give shape to the stories of the archipelago with Nowl Vision Games? This is a remote position. Click the Apply Now button below and include a link to your portfolio in the application form.',
    applyUrl: '#'
  },
  {
    id: 'freelance-sound-designer',
    title: 'Freelance Sound Designer',
    department: 'Audio',
    division: 'Full Development Cycle',
    contract: 'Freelance',
    datePosted: '2026-10-27',
    responsibilities: [
      'Design ambience, creature sounds, and sound effects that build tension and dread.',
      'Record and process Foley for footsteps, objects, and environments.',
      'Implement and balance audio in Unreal Engine with the programming team.',
      'Mix and master in-game audio across headphones and speakers.',
      'Contribute ideas on how silence and sound can carry the horror experience.'
    ],
    requirements: [
      'A demo reel or portfolio of sound design work, ideally for games or film.',
      'Proficient in a DAW such as Reaper, Ableton Live, or Pro Tools.',
      'Understanding of how sound builds atmosphere in psychological horror.',
      'Experience with Unreal Engine audio, MetaSounds, FMOD, or Wwise is a plus.',
      'Owns a home recording setup and quality monitoring headphones.'
    ],
    benefits: [
      'Fully remote, project-based collaboration.',
      'Paid per agreed milestone.',
      'Creative freedom in shaping the soundscape of an original horror title.',
      'Official credit in the game and permission to show approved work in your reel.'
    ],
    howToApply: 'Ready to make players afraid of what they cannot see? This is a remote position with Nowl Vision Games. Click the Apply Now button below and include a link to your demo reel in the application form.',
    applyUrl: '#'
  }
];
