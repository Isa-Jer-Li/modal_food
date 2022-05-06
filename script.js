const modal = document.getElementById("modal")
function openModal() {
	modal.style.display = "block"
}

function closeModal() {
	modal.style.display = "none"
}

// bd
async function ButtonClicked() {

	let values = []
	let checkboxes = document.querySelectorAll('input:checked')

  checkboxes.forEach((checkbox) => {
		values.push(checkbox.value)
	})

   values.join(',')



  const title = document.getElementById('title')
  const ingredients =
   document.getElementById('ingredients')
  const nutrition = document.getElementById('nutrition')
  const prep = document.getElementById('prep')
  const time = document.getElementById('time')
  const error = document.getElementById('error')

  title.innerHTML = ""
  ingredients.innerHTML = ""
  nutrition.innerHTML = ""
  prep.innerHTML = ""
  time.innerHTML = ""
  document.getElementById('image').src = ""

 try{
	 const url = "/api?ingredients=" + values
	const rawRes = await fetch(url)
	const rawResJSON = await rawRes.json()

	for (i = 0; i < rawResJSON.length; i++) {
		if (rawResJSON[i] != null) {

		title.innerHTML += `<div id="title-cont"> ${rawResJSON[i].title} </div>`

	  time.innerHTML += `<div id="time-cont"> ${rawResJSON[i].time} </div>`


		for (x = 0; x < rawResJSON[i].nutrition.length; x++) {
			nutrition.innerHTML += `
				<div id="nutrition-cont">
				<ul><li>${rawResJSON[i].nutrition[x]}</li></ul>
				</div>
				`
			}


		for (y = 0; y < rawResJSON[i].prep.length; y++) {
			prep.innerHTML += `
				<div id="prep-cont">
				<p>${rawResJSON[i].prep[y]}</p>
				</div>
				`
			}


		for (z = 0; z < rawResJSON[i].ingredients.length; z++) {
			ingredients.innerHTML += `
				<div id="nutrition-cont">
				<ul><li> ${rawResJSON[i].ingredients[z]} </li></ul>
				</div>
				`
			}

		document.getElementById('image').src = rawResJSON[i].img
		}
	  }
  }

	catch {
		console.log('err')
		error.innerText = "There are no recipies that fit your search"
	}
	// values = []
	// console.log(values)
}