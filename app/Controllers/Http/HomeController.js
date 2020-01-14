'use strict'

class HomeController {

    index ({ request, response, view }) {
        return view.render('welcome') 
    }
}

module.exports = HomeController
