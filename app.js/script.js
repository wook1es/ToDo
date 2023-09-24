const input = document.querySelector('.input-task')
const btnAdd = document.querySelector('.btn-add-task')
const emptyList = document.querySelector('.list-clear-wrap')
const list = document.querySelector('.list-content');
const counterHTML = document.querySelector('.counter-tasks');

let array = JSON.parse(localStorage.getItem('tasks')) || [];




btnAdd.addEventListener('click', addTask)
list.addEventListener('click', (e) => {
	deleteTask(e)
	done(e)
})



function addTask() {
	const taskText = input.value;
	const item = {
		id: Date.now(),
		text: taskText,
		done: false
	}
	if (input.value !== '') {
		renderTask(item)
		array.push(item)
	}
	if (list.children.length > 0) {
		emptyList.classList.add('none')
	}
	input.value = ''
	input.focus()
	update()
}

function deleteTask(e) {
	if (e.target.dataset.action === 'delete') {
		const parent = e.target.closest('.task_container')
		const id = +parent.id
		parent.remove()
		const index = array.findIndex(task => task.id === id)
		array.splice(index, 1)
		if (list.children.length === 0) {
			emptyList.classList.remove('none')
		}
		update()
	}


}


function counter() {

	if (array.length === 1) {
		counterHTML.textContent = '1 item left'
		counterHTML.style.display = 'flex'
	} else if (array.length > 1) {
		counterHTML.textContent = array.length + ' items left'
		counterHTML.style.display = 'flex'
	} else {
		counterHTML.style.display = 'none'
	}

}


function done(e) {
	if (e.target.dataset.action === 'done') {

		const parent = e.target.closest('.task_container')
		const id = +parent.id
		parent.classList.toggle('background')

		const task = array.find((item) => {
			if (item.id === id) {
				return true
			}
		})
		task.done = !task.done
		update()
	}
}

function update() {
	renderTask()
	counter()
	localStorage.setItem('tasks', JSON.stringify(array))
	if (list.children.length > 0) {
		emptyList.classList.add('none')
	}
	if (array.length === 0) {
	emptyList.classList.remove('none')
	}
}
update()

function clearDoneTasks() {
	array.filter()
}

function renderTask() {
	list.innerHTML = ''
	array.forEach(item => {
		if (item.done === true) {
			var done = 'background'
		}
		list.innerHTML +=
			`
						<div id="${item.id}" class="task_container ${done}">
							<div class="task_content">
								<div class="task-text">${item.text}</div>
								<div class="task-btns">
									<img data-action="done" class="icons" src="./icons/icons8-галочка.svg" alt="">
									<img data-action="delete" class="icons" src="./icons/icons8-крестик-48.png" alt="">
								</div>
							</div>
						</div>
	`
	});
}

renderTask()

const remove = document.querySelector('.btn-remove-task')

remove.addEventListener('click', (e) => {
	array = array.filter((item) => item.done === false)
	update()
})

