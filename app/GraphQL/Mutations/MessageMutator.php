<?php

namespace App\GraphQL\Mutations;

use App\Events\SendMessage;
use App\Models\Messages;
use Exception;
use Illuminate\Support\Arr;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\DB;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;


class MessageMutator
{


    public function sendMessage($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $credentials = Arr::only($args, ['txtMsg', "senderEmail", "receiverEmail"]);

        $msgToBeStored = [
            "txtMsg" => $credentials["txtMsg"],
            "senderEmail" => $credentials["senderEmail"],
            "receiverEmail" => $credentials["receiverEmail"],
            'sent_at' => time()
        ];


        broadcast(new SendMessage($msgToBeStored));

        // Construct a message to store to database
        $messages = new Messages();
        $messages->id = rand(0, 7000000000);
        $messages->txtMsg = $msgToBeStored["txtMsg"];
        $messages->senderEmail = $msgToBeStored["senderEmail"];
        $messages->receiverEmail = $msgToBeStored["receiverEmail"];
        $messages->sent_at = $msgToBeStored["sent_at"];

        // Save message to database
        $messages->save();

        return $msgToBeStored;
    }

    public function loadP2pChat($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        // Not neccessary for Now
        $credentials = Arr::only($args, ["senderEmail", "receiverEmail"]);

        $messages = Messages::all();

        return [
            "messages" => $messages
        ];
    }
}
