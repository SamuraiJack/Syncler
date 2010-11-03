require.paths.unshift('./lib')


var http    = require('http')
var sys     = require('sys')
var puts    = sys.puts
var express = require('express')
faye        = require('faye') // make it global to skip loading as a dependency of Syncler

var argv            = require('optimist').argv

var backendClass    = argv.backendClass     && JSON.parse(argv.backendClass)     || 'KiokuJS.Backend.Hash'
var backendParams   = argv.backendParams    && JSON.parse(argv.backendParams)    || {}
var baseURL         = argv.baseURL          && JSON.parse(argv.baseURL)          || '/syncler'
var fayeURL         = argv.fayeURL          && JSON.parse(argv.fayeURL)          || '/faye'


var port            = Number(argv.port)                                          || 8080
var deepPrefetch    = argv.deepPrefetch                                          || false


require('Task/Joose/NodeJS')

use([

    'Syncler.ServerApp',
    backendClass

], function () {
    
    var app = express.createServer()
    
    app.configure(function () {
        app.use( express.bodyDecoder() )
    })
    
    
    puts('Starting Syncler.ServerApp')
    
    var server = new Syncler.ServerApp({
        backendClass        : eval('(' + backendClass + ')'),
        
        backendParams       : backendParams,
        
        fayeURL             : fayeURL.replace(/\/$/, ''),
        baseURL             : baseURL.replace(/\/$/, ''),
        
        port                : port,
        
        app                 : app,
        
        deepPrefetch        : deepPrefetch
    })

    
    app.listen(port)
    
    puts('Syncler.ServerApp server started')
    puts('Backend class: : [' + backendClass + ']')
    puts('Backend configuration parameters: ' + JSON.stringify(backendParams))
    puts('BaseURL: [' + baseURL + ']')
    puts('FayeURL: [' + fayeURL + ']')
    puts('Port: [' + port + ']')
})


process.on('uncaughtException', function (err) {
    console.log('exception: ' + err)
    console.log('stack: ' + err.stack)
})
