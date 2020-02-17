ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

ESX.RegisterCommand('spec', 'admin', function(xPlayer, args, showError)
	xPlayer.triggerEvent('esx_spectate:spectate', args.playerId)
end, false, {help = 'Spectate a player', validate = true, arguments = {
	{name = 'playerId', help = 'player id', type = 'playerId'}
}})

ESX.RegisterServerCallback('esx_spectate:getPlayerData', function(source, cb, id)
	local xPlayer = ESX.GetPlayerFromId(id)
	cb(xPlayer)
end)

RegisterNetEvent('esx_spectate:kick')
AddEventHandler('esx_spectate:kick', function(target, msg)
	local xPlayer = ESX.GetPlayerFromId(source)

	if xPlayer.getGroup() ~= 'user' then
		DropPlayer(target, msg)
	else
		print(('esx_spectate: %s attempted to kick a player!'):format(xPlayer.identifier))
		DropPlayer(source, 'esx_spectate: you\'re not authorized to kick people.')
	end
end)