Session.setDefault('filterOotel', true)
Session.setDefault('filterKatsetamisele', true)
Session.setDefault('filterKinnitatud', false)
Session.setDefault('KSM-range', 'last20')

// Convert commas to periods so it's more comfy for workers
document.addEventListener('keydown', function(e){
    if (e.target.tagName === "INPUT" && e.target.type === "number" && e.key === ",") {
        e.target.value += '.'
        e.preventDefault()
    }
})
