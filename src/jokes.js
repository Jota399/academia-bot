const JOKES = [
  '¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.',
  '¿Qué le dice un jaguar a otro jaguar? Nada, los jaguares no hablan.',
  '¿Cómo se dice pincel en inglés? Bro, sh.',
  '¿Qué hace una abeja en el gimnasio? Zum-ba.',
  'Mi wifi y mi vida amorosa tienen algo en común: ambos se desconectan solos.',
  '¿Por qué el libro de matemáticas está triste? Porque tiene demasiados problemas.',
  'Fui al médico y le dije "doctor, me rompí el brazo en dos lugares". Me dijo: pues no vuelvas a esos lugares.',
  '¿Qué le dijo un semáforo a otro? No me mires que me estoy cambiando.',
  '¿Cuál es el colmo de un electricista? Que le den calambres cuando se enamora.',
  'Ayer maté a un mosquito de un aplauso. Fue un asesinato a sangre fría.',
];

function getRandomJoke() {
  return JOKES[Math.floor(Math.random() * JOKES.length)];
}

module.exports = { getRandomJoke };
