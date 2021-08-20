const MYDIV = document.querySelector('#super');
let NB_RECT_PAR_LIGNE = 16;
const RECT_WIDTH = 600 / NB_RECT_PAR_LIGNE;
let GOMME_TOGGLE = false;


/** getColor function - To generate a random pastel color from HSL function
 *
 * @return {number}
 * */
function getColor() {
  return 'hsl(' + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' +
             (85 + 10 * Math.random()) + '%)';
}

/** To start with a blanck grid
  * return {} */
function BLANK_GRID() {
  CREATE_GRID(NB_RECT_PAR_LIGNE);
}

/** Create a new grid and generate <div>
 * @param {integer} nb_par_ligne: Number of squares we want for each lines
 */
function CREATE_GRID(nb_par_ligne=16) {
  MYDIV.querySelectorAll('*').forEach((n) => n.remove());

  // Reformating the master div
  MYDIV.style.setProperty('--cols', nb_par_ligne);
  MYDIV.style.setProperty('--rows', nb_par_ligne);

  // Now we can populate the master div
  for (let i=1; i<= nb_par_ligne*nb_par_ligne; i++) {
    const new_div = document.createElement('div');
    new_div.setAttribute('id', 'div_'+i);
    new_div.setAttribute('class', 'minidiv');
    new_div.addEventListener('mouseover', (event) => {
      let color = '';
      if (GOMME_TOGGLE == false) {
        color = getColor();
      } else {
        color = '#FFFFFF';
      }
      event.srcElement.style.background=`${color}`;
    });
    MYDIV.appendChild(new_div);
  }
}


const gomme = document.querySelector('#gomme_outils');
gomme.addEventListener('click', (event) => {
  GOMME_TOGGLE = !GOMME_TOGGLE;
  gomme.style.background = (GOMME_TOGGLE==true) ? 'pink' : '';
});

const btn_effacer = document.querySelector('#gomme');
btn_effacer.addEventListener('click', (event) => {
  BLANK_GRID();
});

const btn_nouveau = document.querySelector('#nouveau');
btn_nouveau.addEventListener('click', (event) => {
  NB_RECT_PAR_LIGNE = prompt('Combien de cases par lignes ? ', 16);
  if (NB_RECT_PAR_LIGNE > 0 ) {
    if (NB_RECT_PAR_LIGNE>100) {
      alert('More than 100 is too much, value set to 100.');
      NB_RECT_PAR_LIGNE=100;
    }
    CREATE_GRID(NB_RECT_PAR_LIGNE);
  }
});

CREATE_GRID(16);
