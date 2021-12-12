<?php

use App\Events\LoadP2PChats;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Load peer to peer chats
Route::post('/p2p', function (Request $request) {

    // Get data from request
    $data = [
        "senderEmail" => $request->get('senderEmail'),
        "receiverEmail" => $request->get('receiverEmail'),
    ];

    // Emit LoadP2PChats
    event(new LoadP2PChats($data));
    return true;
});

// Any other should use this
Route::get('/{any}', function () {
    return view("app");
})->where('any', '.*');
