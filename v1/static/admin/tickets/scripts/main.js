const toggleFragment= (element) => {
	document.querySelector('div.fragment-controller.active').classList.remove('active');
	document.querySelector('div.fragment.active').classList.remove('active');

	element.classList.add('active');
	document.querySelector(`div.fragment#${element.id}`).classList.add('active');

}

const toggleTicketRow = (element) => {
    const collapse = element.querySelector('.ticket-row-collapsable');
    element.style.backgroundColor = collapse.classList.contains('active') ? 'transparent' : 'rgba(0, 0, 0, 0.05)';
    collapse.classList.toggle('active');
}

