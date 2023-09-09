const aboutContent = [education, skills];

const test = (id) => {
  Array.from(document.getElementsByClassName('selected')).forEach((item) => {
    item.classList.remove('selected');
  });

  document.getElementById(id).classList.add('selected');
  let selectedContent;

  switch (id) {
    case 'education-button':
      selectedContent = education;
      break;
    case 'skills-button':
      selectedContent = skills;
      break;
    default:
      selectedContent = education;
  }
  document.getElementById('about-content').innerHTML = selectedContent;
};

window.onload = () => {
  document.getElementById('about-content').innerHTML = education;
  document.getElementById('education-button').classList.add('selected');
};
