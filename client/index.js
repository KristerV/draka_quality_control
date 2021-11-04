Session.setDefault('filterOotel', true)
Session.setDefault('filterKatsetamisele', true)
Session.setDefault('filterKinnitatud', false)
Session.setDefault('KSM-range', 'last20')

// Convert commas to periods so it's more comfy for workers
document.addEventListener('keydown', function(e){
    if (e.target.tagName === "INPUT" && e.target.type === "number" && e.key === ",") {
        var val = e.target.value
        e.target.value += '.'
        e.preventDefault()

        // Chrome can't handle a rogue dot so it just deletes the value. Revert it.
        if (e.target.value === "") {
            e.target.value = val
            sAlert.error("Palun kasuta koma asemel punkti. Või proovi Firefoxi.")
        }
    }
})
