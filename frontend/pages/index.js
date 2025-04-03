export default function Home() {
  return (
    <div className='main-container'>
      <div className='home-title-container'>
        <h1 className='title-home'>Bienvenue sur DiversHelper !</h1>
        <p>Le site des véritables Helldivers pour pouvoir distribuer la démocratie</p>
      </div>

      <div className='container-main'>
        <article>
          <h2>L’appel de la Démocratie</h2>
          <p>
            La Super-Terre, bastion de la véritable démocratie, est menacée par des hordes d’aliens
            qui refusent de se soumettre aux principes démocratiques universels. Ces ennemis de la
            liberté - insectes titanesques, cyborgs violents et autres monstruosités - ne
            comprennent qu'un langage : celui des armes. Alors, pour protéger ces valeurs
            précieuses, il est de votre devoir de vous battre. Brutalement.
          </p>

          <h2>Collaboration Obligatoire</h2>
          <p>
            En équipe, jusqu'à quatre joueurs, la coopération est essentielle. Attention : dans
            cette démocratie militaire, chaque tir compte, même ceux qui touchent vos alliés. La
            violence est un outil collectif, mais elle exige discipline et coordination. Après tout,
            rien ne dit "esprit d’équipe" comme un lance-roquettes tiré un peu trop tôt.
          </p>

          <h2>L’équipement : Liberté de Choix, Puissance Obligatoire</h2>
          <p>
            Chaque mission est une occasion d’exercer vos droits démocratiques à utiliser l’arme de
            votre choix : fusils laser, mortiers lourds, ou encore frappes nucléaires. La variété
            des gadgets et stratagèmes à votre disposition reflète la diversité de pensée… mais
            aussi la force de persuasion nécessaire pour soumettre vos ennemis.
          </p>

          <h2>Pour la Démocratie, Jusqu’au Sacrifice</h2>
          <p>
            Le sacrifice personnel est au cœur de la philosophie des Helldivers. Qu’il s’agisse de
            foncer dans une vague d’ennemis pour activer un objectif ou de vous faire écraser par
            une capsule de ravitaillement mal placée, tout acte de violence au service de la
            Super-Terre est une preuve de votre engagement.
          </p>

          <h2>Conclusion : La Violence au Service de l’Idéal</h2>
          <p>
            Dans <em>Helldivers 2</em>, la démocratie ne se défend pas avec des discours, mais avec
            des armes surchauffées et des explosions tonitruantes. Chaque balle tirée est un message
            envoyé à l’univers : la liberté n’est pas gratuite, et certains idéaux valent tous les
            carnages nécessaires. Alors, chaussez vos bottes, chargez vos fusils, et préparez-vous à
            exporter la démocratie… l'arme au poing.
          </p>

          <p className='textToRight'>
            <strong>Super-Terre compte sur vous !</strong>
          </p>
        </article>
      </div>

      <iframe
        width='854'
        height='480'
        src='https://www.youtube.com/embed/OEx-6BmiN-c?si=-PkpjhbVtNSt6QtX&autoplay=1&mute=1'
        title='YouTube video player'
        frameBorder='0'
        allow='autoplay; encrypted-media'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen></iframe>

      <script src='/javascripts/script.js'></script>
    </div>
  );
}
