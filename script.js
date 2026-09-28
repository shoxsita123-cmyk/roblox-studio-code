const scriptTemplates = {
    vip1: {
        title: "$1 VIP Parkour Skripti (10 Qator Qaytarilmas Kod)",
        code: `-- $1 VIP Parkour: Jump Pad & Sound Effect (10 qator qaytarilmas Luau kodi)
local pad = script.Parent
local sound = pad:FindFirstChildWhichIsA("Sound") or Instance.new("Sound", pad)
sound.SoundId = "rbxassetid://9125402735"

pad.Touched:Connect(function(hit)
    local hrp = hit.Parent:FindFirstChild("HumanoidRootPart")
    if hrp then
        hrp.Velocity = Vector3.new(hrp.Velocity.X, 150, hrp.Velocity.Z)
        sound:Play()
    end
end)`
    },
    vip5: {
        title: "$5 VIP Parkour Pro Pack (50 Qator Qaytarilmas Kod)",
        code: `-- $5 VIP Parkour Pro Pack: 5 ta unikal mexanika (50 qator qaytarilmas Luau kodi)
local TweenService = game:GetService("TweenService")
local Debris = game:GetService("Debris")
local Players = game:GetService("Players")

-- 1. Harakatlanuvchi platforma (Moving Platform)
local platform = script.Parent:WaitForChild("MovingPart")
local tweenInfo = TweenInfo.new(3, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true)
TweenService:Create(platform, tweenInfo, {Position = platform.Position + Vector3.new(0, 30, 0)}):Play()

-- 2. Lava o'ldiruvchi alanga (Fire Lava Obstacle)
local lava = script.Parent:WaitForChild("LavaPart")
lava.Touched:Connect(function(hit)
    local hum = hit.Parent:FindFirstChildWhichIsA("Humanoid")
    if hum then hum:TakeDamage(100) end
end)

-- 3. Speed Ring (Teshigidan o'tganda tezlashtiruvchi halqa)
local ring = script.Parent:WaitForChild("SpeedRing")
ring.Touched:Connect(function(hit)
    local hum = hit.Parent:FindFirstChildWhichIsA("Humanoid")
    if hum and not hum:FindFirstChild("SpeedBoosted") then
        local tag = Instance.new("BoolValue", hum)
        tag.Name = "SpeedBoosted"
        Debris:AddItem(tag, 5)
        
        local oldSpeed = hum.WalkSpeed
        hum.WalkSpeed = 60
        task.wait(5)
        hum.WalkSpeed = oldSpeed
    end
end)

-- 4. Yiqiluvchi parkour ustun (Falling Pillar Trap)
local pillar = script.Parent:WaitForChild("FallingPillar")
pillar.Touched:Connect(function(hit)
    if hit.Parent:FindFirstChildWhichIsA("Humanoid") and pillar.Anchored then
        task.wait(0.2)
        pillar.Anchored = false
        task.wait(4)
        pillar.CFrame = pillar.CFrame
        pillar.Anchored = true
    end
end)

-- 5. VIP Parkour Checkpoint bayrog'i
local flag = script.Parent:WaitForChild("VipFlag")
flag.Touched:Connect(function(hit)
    local player = Players:GetPlayerFromCharacter(hit.Parent)
    if player and player:FindFirstChild("leaderstats") then
        player.leaderstats.Stage.Value = flag.Attribute:Get("StageNumber") or 5
    end
end)`
    },
    vip100: {
        title: "$100 Ultimate Parkour Master Pack (100 Qator Qaytarilmas Kod)",
        code: `-- $100 Ultimate Parkour Master Pack (100 qator mukammal qaytarilmas Luau kodi)
local DataStoreService = game:GetService("DataStoreService")
local ObbyDataStore = DataStoreService:GetDataStore("ObbyMasterSystem_v100")
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

-- 1. Complete Stage Auto-Save System
Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local stage = Instance.new("IntValue")
    stage.Name = "Stage"
    stage.Value = 1
    stage.Parent = leaderstats

    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Value = 0
    coins.Parent = leaderstats

    local key = "ObbyPlayer_" .. player.UserId
    local success, data = pcall(function() return ObbyDataStore:GetAsync(key) end)
    if success and data then
        stage.Value = data.Stage or 1
        coins.Value = data.Coins or 0
    end

    player.CharacterAdded:Connect(function(char)
        local hrp = char:WaitForChild("HumanoidRootPart")
        local stagePart = workspace:FindFirstChild("Checkpoints"):FindFirstChild(tostring(stage.Value))
        if stagePart then
            task.wait(0.1)
            hrp.CFrame = stagePart.CFrame + Vector3.new(0, 4, 0)
        end
    end)
end)

Players.PlayerRemoving:Connect(function(player)
    local key = "ObbyPlayer_" .. player.UserId
    pcall(function()
        ObbyDataStore:SetAsync(key, {
            Stage = player.leaderstats.Stage.Value,
            Coins = player.leaderstats.Coins.Value
        })
    end)
end)

-- 2. Anti-Cheat Anti-Fly & Speed Enforcement
Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(char)
        local hum = char:WaitForChild("Humanoid")
        local hrp = char:WaitForChild("HumanoidRootPart")
        
        while char and char.Parent do
            task.wait(1)
            if hum.WalkSpeed > 70 then hum.WalkSpeed = 16 end
            if hrp.Position.Y > 1000 then hrp.CFrame = CFrame.new(0, 10, 0) end
        end
    end)
end)

-- 3. Dynamic Laser Beam & Rotating Blade Obstacles
local laser = workspace:FindFirstChild("LaserBeam")
if laser then
    local tInfo = TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1, true)
    TweenService:Create(laser, tInfo, {CFrame = laser.CFrame * CFrame.Angles(0, math.rad(180), 0)}):Play()
end

-- 4. Infinite Checkpoint Detector Engine
for _, checkpoint in ipairs(workspace:WaitForChild("Checkpoints"):GetChildren()) do
    checkpoint.Touched:Connect(function(hit)
        local player = Players:GetPlayerFromCharacter(hit.Parent)
        if player then
            local currentStage = player.leaderstats.Stage
            local checkpointNum = tonumber(checkpoint.Name)
            if checkpointNum and checkpointNum == currentStage.Value + 1 then
                currentStage.Value = checkpointNum
                player.leaderstats.Coins.Value += 10
            end
        end
    end)
end`
    },
    doublejump: {
        title: "Double Jump (Ikki Karra Sakrash)",
        code: `-- StarterPlayer -> StarterPlayerScripts -> DoubleJumpScript.luau (LocalScript)
local UserInputService = game:GetService("UserInputService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

local canDoubleJump = false
local hasDoubleJumped = false
local DOUBLE_JUMP_POWER = 67

humanoid.StateChanged:Connect(function(oldState, newState)
    if newState == Enum.HumanoidStateType.Landed then
        canDoubleJump = false
        hasDoubleJumped = false
    elseif newState == Enum.HumanoidStateType.Freefall then
        task.wait(0.1)
        if not hasDoubleJumped then
            canDoubleJump = true
        end
    end
end)

UserInputService.JumpRequest:Connect(function()
    if canDoubleJump and not hasDoubleJumped then
        hasDoubleJumped = true
        canDoubleJump = false
        humanoid.JumpPower = DOUBLE_JUMP_POWER
        humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
    end
end)`
    },
    sprint: {
        title: "Shift Sprint (Tez Yugurish & FOV)",
        code: `-- StarterPlayer -> StarterPlayerScripts -> SprintScript.luau (LocalScript)
local UserInputService = game:GetService("UserInputService")
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")
local camera = workspace.CurrentCamera

local NORMAL_SPEED = 16
local SPRINT_SPEED = 35
local NORMAL_FOV = 70
local SPRINT_FOV = 85

local tweenInfo = TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)

UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    if input.KeyCode == Enum.KeyCode.LeftShift then
        humanoid.WalkSpeed = SPRINT_SPEED
        TweenService:Create(camera, tweenInfo, {FieldOfView = SPRINT_FOV}):Play()
    end
end)

UserInputService.InputEnded:Connect(function(input, gameProcessed)
    if input.KeyCode == Enum.KeyCode.LeftShift then
        humanoid.WalkSpeed = NORMAL_SPEED
        TweenService:Create(camera, tweenInfo, {FieldOfView = NORMAL_FOV}):Play()
    end
end)`
    },
    dash: {
        title: "Q Dash / Dodge (Yon tomonga ildam otilish)",
        code: `-- StarterPlayer -> StarterPlayerScripts -> DashScript.luau (LocalScript)
local UserInputService = game:GetService("UserInputService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local hrp = character:WaitForChild("HumanoidRootPart")

local DASH_POWER = 85
local DASH_COOLDOWN = 1.5
local canDash = true

UserInputService.InputBegan:Connect(function(input, gpe)
    if gpe or not canDash then return end
    if input.KeyCode == Enum.KeyCode.Q then
        canDash = false
        local moveDir = character.Humanoid.MoveDirection
        if moveDir.Magnitude == 0 then moveDir = hrp.CFrame.LookVector end
        
        local bv = Instance.new("BodyVelocity")
        bv.MaxForce = Vector3.new(1, 0, 1) * 100000
        bv.Velocity = moveDir * DASH_POWER
        bv.Parent = hrp
        game:GetService("Debris"):AddItem(bv, 0.2)
        
        task.wait(DASH_COOLDOWN)
        canDash = true
    end
end)`
    },
    petfollow: {
        title: "Pet Follow System (O'yinchi Ketidan Yuruvchi Pet)",
        code: `-- Workspace -> PetModel -> Script.luau
local pet = script.Parent
local primaryPart = pet.PrimaryPart or pet:FindFirstChildWhichIsA("BasePart")

local function followPlayer(targetCharacter)
    local targetHrp = targetCharacter:WaitForChild("HumanoidRootPart")
    
    local alignPos = Instance.new("AlignPosition")
    alignPos.MaxForce = 50000
    alignPos.Responsiveness = 15
    alignPos.Mode = Enum.PositionAlignmentMode.OneAttachment
    alignPos.Attachment0 = primaryPart:WaitForChild("Attachment")
    alignPos.Parent = primaryPart

    game:GetService("RunService").Heartbeat:Connect(function()
        if targetHrp then
            local offset = targetHrp.CFrame * Vector3.new(3, 2, 3)
            alignPos.Position = offset
        end
    end)
end`
    },
    ragdoll: {
        title: "Ragdoll On Death (O'lganda Yiqilish Effekti)",
        code: `-- ServerScriptService -> RagdollService.luau
local Players = game:GetService("Players")

local function makeRagdoll(character)
    for _, joint in ipairs(character:GetDescendants()) do
        if joint:IsA("Motor6D") and joint.Name ~= "RootJoint" then
            local socket = Instance.new("BallSocketConstraint")
            local a0 = Instance.new("Attachment")
            local a1 = Instance.new("Attachment")
            
            a0.CFrame = joint.C0
            a1.CFrame = joint.C1
            a0.Parent = joint.Part0
            a1.Parent = joint.Part1
            
            socket.Attachment0 = a0
            socket.Attachment1 = a1
            socket.Parent = joint.Part0
            
            joint.Enabled = false
        end
    end
end

Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(character)
        character:WaitForChild("Humanoid").Died:Connect(function()
            makeRagdoll(character)
        end)
    end)
end)`
    },
    xpstats: {
        title: "XP & Level System (Daraja Oshirish Sistemasi)",
        code: `-- ServerScriptService -> LevelSystem.luau
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    local stats = Instance.new("Folder")
    stats.Name = "leaderstats"
    stats.Parent = player

    local level = Instance.new("IntValue")
    level.Name = "Level"
    level.Value = 1
    level.Parent = stats

    local xp = Instance.new("IntValue")
    xp.Name = "XP"
    xp.Value = 0
    xp.Parent = stats

    xp.Changed:Connect(function(newXp)
        local neededXp = level.Value * 100
        if newXp >= neededXp then
            xp.Value = newXp - neededXp
            level.Value = level.Value + 1
        end
    end)
end)`
    },
    raycastgun: {
        title: "Raycast Laser Gun (Qurol Otish Kobi)",
        code: `-- Tool -> LocalScript.luau
local tool = script.Parent
local player = game.Players.LocalPlayer
local mouse = player:GetMouse()

tool.Activated:Connect(function()
    local origin = tool.Handle.Position
    local target = mouse.Hit.Position
    local direction = (target - origin).Unit * 300

    local raycastParams = RaycastParams.new()
    raycastParams.FilterAncestorsInstances = {player.Character}
    raycastParams.FilterType = Enum.RaycastFilterType.Exclude

    local result = workspace:Raycast(origin, direction, raycastParams)
    if result and result.Instance then
        local humanoid = result.Instance.Parent:FindFirstChildWhichIsA("Humanoid")
        if humanoid then
            humanoid:TakeDamage(30)
        end
    end
end)`
    },
    jumppad: {
        title: "Parkour Trampoline (Baland Sakratuvchi Jump Pad)",
        code: `-- Parkour Part ichiga Script joylashtiring
local pad = script.Parent
local JUMP_BOOST = 130

pad.Touched:Connect(function(hit)
    local character = hit.Parent
    local hrp = character:FindFirstChild("HumanoidRootPart")
    if hrp then
        hrp.Velocity = Vector3.new(hrp.Velocity.X, JUMP_BOOST, hrp.Velocity.Z)
    end
end)`
    },
    disappearing: {
        title: "Parkour Yo'qolib Qoluvchi Blok (Disappearing Platform)",
        code: `-- Parkour Part ichiga Script joylashtiring
local platform = script.Parent
local isTouched = false

platform.Touched:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChildWhichIsA("Humanoid")
    if humanoid and not isTouched then
        isTouched = true
        task.wait(0.5)
        platform.Transparency = 1
        platform.CanCollide = false
        task.wait(3)
        platform.Transparency = 0
        platform.CanCollide = true
        isTouched = false
    end
end)`
    },
    checkpoint: {
        title: "Parkour Checkpoint System (Bosqichni Saqlash)",
        code: `-- ServerScriptService -> CheckpointService.luau
local Players = game:GetService("Players")
local CheckpointsFolder = workspace:WaitForChild("Checkpoints")

Players.PlayerAdded:Connect(function(player)
    local stage = Instance.new("IntValue")
    stage.Name = "stage"
    stage.Value = 1
    stage.Parent = player:WaitForChild("leaderstats", 5) or Instance.new("Folder", player)

    player.CharacterAdded:Connect(function(character)
        local hrp = character:WaitForChild("HumanoidRootPart")
        local currentStagePart = CheckpointsFolder:FindFirstChild(tostring(stage.Value))
        if currentStagePart then
            task.wait(0.1)
            hrp.CFrame = currentStagePart.CFrame + Vector3.new(0, 3, 0)
        end
    end)
end)`
    },
    datastore: {
        title: "DataStore (O'yin Natijalarini Saqlash)",
        code: `-- ServerScriptService -> DataStoreScript.luau
local DataStoreService = game:GetService("DataStoreService")
local myDataStore = DataStoreService:GetDataStore("PlayerSaveSystem_v1")
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Value = 0
    coins.Parent = leaderstats

    local playerKey = "Player_" .. player.UserId
    local success, data = pcall(function()
        return myDataStore:GetAsync(playerKey)
    end)

    if success and data then
        coins.Value = data
    end
end)`
    }
};

// Theme toggle function (Oq / Qora rejim)
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById("themeIcon");
    body.classList.toggle("light-theme");

    if (body.classList.contains("light-theme")) {
        icon.className = "fa-solid fa-moon";
    } else {
        icon.className = "fa-solid fa-sun";
    }
}

// Initialize dynamic generator fields
function updateGeneratorFields() {
    const type = document.getElementById("scriptType").value;
    const dynamicContainer = document.getElementById("dynamicFields");
    let html = "";

    if (type === "dash") {
        html = `
            <div class="form-group">
                <label for="dashPower">Dash Kuchi (Default: 85):</label>
                <input type="number" id="dashPower" class="form-control" value="85" oninput="generateScript()">
            </div>
            <div class="form-group">
                <label for="dashCooldown">Kutish vaqti (Cooldown soniya):</label>
                <input type="number" id="dashCooldown" class="form-control" value="1.5" step="0.1" oninput="generateScript()">
            </div>
        `;
    } else if (type === "xpstats") {
        html = `
            <div class="form-group">
                <label for="xpNeeded">Birinchi daraja uchun kerakli XP:</label>
                <input type="number" id="xpNeeded" class="form-control" value="100" oninput="generateScript()">
            </div>
        `;
    } else if (type === "raycastgun") {
        html = `
            <div class="form-group">
                <label for="gunDamage">Zarar yetkazish miqdori (Damage):</label>
                <input type="number" id="gunDamage" class="form-control" value="30" oninput="generateScript()">
            </div>
        `;
    } else if (type === "doublejump") {
        html = `
            <div class="form-group">
                <label for="jumpPower">Ikkinchi sakrash kuchi (Default: 65):</label>
                <input type="number" id="jumpPower" class="form-control" value="67" oninput="generateScript()">
            </div>
        `;
    } else if (type === "sprint") {
        html = `
            <div class="form-group">
                <label for="sprintSpeed">Yugurish tezligi (Normal speed 16):</label>
                <input type="number" id="sprintSpeed" class="form-control" value="35" oninput="generateScript()">
            </div>
            <div class="form-group">
                <label for="sprintFov">Kamera kengligi (FOV, Normal 70):</label>
                <input type="number" id="sprintFov" class="form-control" value="85" oninput="generateScript()">
            </div>
        `;
    } else if (type === "jumppad") {
        html = `
            <div class="form-group">
                <label for="padBoost">Sakratish kuchi (Jump Boost):</label>
                <input type="number" id="padBoost" class="form-control" value="130" oninput="generateScript()">
            </div>
        `;
    } else if (type === "disappearing") {
        html = `
            <div class="form-group">
                <label for="fadeDelay">Yo'qolish vaqti (soniyada):</label>
                <input type="number" id="fadeDelay" class="form-control" value="0.5" step="0.1" oninput="generateScript()">
            </div>
        `;
    } else if (type === "leaderstats") {
        html = `
            <div class="form-group">
                <label for="statName">Valyuta Nomi (masalan: Coins, Stage, Tanga):</label>
                <input type="text" id="statName" class="form-control" value="Coins" oninput="generateScript()">
            </div>
        `;
    }

    dynamicContainer.innerHTML = html;
    generateScript();
}

// Generate Roblox Luau script code
function generateScript() {
    const type = document.getElementById("scriptType").value;
    const outputCode = document.getElementById("generatedCode");
    const instructionText = document.getElementById("scriptInstructionText");
    let script = "";

    if (type === "dash") {
        const power = document.getElementById("dashPower") ? document.getElementById("dashPower").value : 85;
        const cooldown = document.getElementById("dashCooldown") ? document.getElementById("dashCooldown").value : 1.5;

        script = `-- StarterPlayer -> StarterPlayerScripts -> QDashScript.luau (LocalScript)
local UserInputService = game:GetService("UserInputService")
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local hrp = character:WaitForChild("HumanoidRootPart")

local DASH_POWER = ${power}
local DASH_COOLDOWN = ${cooldown}
local canDash = true

UserInputService.InputBegan:Connect(function(input, gpe)
    if gpe or not canDash then return end
    if input.KeyCode == Enum.KeyCode.Q then
        canDash = false
        local moveDir = character.Humanoid.MoveDirection
        if moveDir.Magnitude == 0 then moveDir = hrp.CFrame.LookVector end
        
        local bv = Instance.new("BodyVelocity")
        bv.MaxForce = Vector3.new(1, 0, 1) * 100000
        bv.Velocity = moveDir * DASH_POWER
        bv.Parent = hrp
        game:GetService("Debris"):AddItem(bv, 0.2)
        
        task.wait(DASH_COOLDOWN)
        canDash = true
    end
end)`;
        instructionText.innerText = "Q tugmasi bosilganda ildam otiluvchi Dash skripti. StarterPlayerScripts ichiga joylang.";

    } else if (type === "xpstats") {
        const need = document.getElementById("xpNeeded") ? document.getElementById("xpNeeded").value : 100;
        script = `-- ServerScriptService -> LevelSystem.luau (Script)
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    local stats = Instance.new("Folder")
    stats.Name = "leaderstats"
    stats.Parent = player

    local level = Instance.new("IntValue")
    level.Name = "Level"
    level.Value = 1
    level.Parent = stats

    local xp = Instance.new("IntValue")
    xp.Name = "XP"
    xp.Value = 0
    xp.Parent = stats

    xp.Changed:Connect(function(newXp)
        local neededXp = level.Value * ${need}
        if newXp >= neededXp then
            xp.Value = newXp - neededXp
            level.Value = level.Value + 1
        end
    end)
end)`;
        instructionText.innerText = "Level va XP avtomatik beruvchi Server skripti. ServerScriptService ichiga joylang.";

    } else if (type === "raycastgun") {
        const dmg = document.getElementById("gunDamage") ? document.getElementById("gunDamage").value : 30;
        script = `-- Tool ichiga LocalScript qilib joylashtiring
local tool = script.Parent
local player = game.Players.LocalPlayer
local mouse = player:GetMouse()

tool.Activated:Connect(function()
    local origin = tool.Handle.Position
    local target = mouse.Hit.Position
    local direction = (target - origin).Unit * 300

    local raycastParams = RaycastParams.new()
    raycastParams.FilterAncestorsInstances = {player.Character}
    raycastParams.FilterType = Enum.RaycastFilterType.Exclude

    local result = workspace:Raycast(origin, direction, raycastParams)
    if result and result.Instance then
        local humanoid = result.Instance.Parent:FindFirstChildWhichIsA("Humanoid")
        if humanoid then
            humanoid:TakeDamage(${dmg})
        end
    end
end)`;
        instructionText.innerText = "Lazer / Otuvchi qurol skripti. Tool ichiga LocalScript shaklida joylashtiring.";

    } else if (type === "doublejump") {
        const power = document.getElementById("jumpPower") ? document.getElementById("jumpPower").value : 67;
        script = `-- StarterPlayerScripts -> DoubleJump.luau (LocalScript)
local UserInputService = game:GetService("UserInputService")
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

local canDoubleJump = false
local hasDoubleJumped = false
local DOUBLE_JUMP_POWER = ${power}

humanoid.StateChanged:Connect(function(oldState, newState)
    if newState == Enum.HumanoidStateType.Landed then
        canDoubleJump = false
        hasDoubleJumped = false
    elseif newState == Enum.HumanoidStateType.Freefall then
        task.wait(0.1)
        if not hasDoubleJumped then
            canDoubleJump = true
        end
    end
end)

UserInputService.JumpRequest:Connect(function()
    if canDoubleJump and not hasDoubleJumped then
        hasDoubleJumped = true
        canDoubleJump = false
        humanoid.JumpPower = DOUBLE_JUMP_POWER
        humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
    end
end)`;
        instructionText.innerText = "StarterPlayerScripts papkasi ichiga LocalScript qilib joylashtiring.";

    } else if (type === "sprint") {
        const speed = document.getElementById("sprintSpeed") ? document.getElementById("sprintSpeed").value : 35;
        const fov = document.getElementById("sprintFov") ? document.getElementById("sprintFov").value : 85;
        script = `-- StarterPlayerScripts -> ShiftSprint.luau (LocalScript)
local UserInputService = game:GetService("UserInputService")
local TweenService = game:GetService("TweenService")
local player = game.Players.LocalPlayer

local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")
local camera = workspace.CurrentCamera

local SPRINT_SPEED = ${speed}
local SPRINT_FOV = ${fov}

local tweenInfo = TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)

UserInputService.InputBegan:Connect(function(input, gpe)
    if gpe then return end
    if input.KeyCode == Enum.KeyCode.LeftShift then
        humanoid.WalkSpeed = SPRINT_SPEED
        TweenService:Create(camera, tweenInfo, {FieldOfView = SPRINT_FOV}):Play()
    end
end)

UserInputService.InputEnded:Connect(function(input, gpe)
    if input.KeyCode == Enum.KeyCode.LeftShift then
        humanoid.WalkSpeed = 16
        TweenService:Create(camera, tweenInfo, {FieldOfView = 70}):Play()
    end
end)`;
        instructionText.innerText = "StarterPlayerScripts ichiga LocalScript qilib joylashtiring.";

    } else if (type === "jumppad") {
        const boost = document.getElementById("padBoost") ? document.getElementById("padBoost").value : 130;
        script = `-- Trampoline Part ichiga Script joylashtiring
local pad = script.Parent

pad.Touched:Connect(function(hit)
    local char = hit.Parent
    local hrp = char:FindFirstChild("HumanoidRootPart")
    if hrp then
        hrp.Velocity = Vector3.new(hrp.Velocity.X, ${boost}, hrp.Velocity.Z)
    end
end)`;
        instructionText.innerText = "Parkour batut bloki (Part) ichiga oddiy Script joylashtiring.";

    } else if (type === "disappearing") {
        const fade = document.getElementById("fadeDelay") ? document.getElementById("fadeDelay").value : 0.5;
        script = `-- Parkour yo'qoluvchi blok Scripti
local platform = script.Parent
local isTouched = false

platform.Touched:Connect(function(hit)
    local char = hit.Parent
    local humanoid = char:FindFirstChildWhichIsA("Humanoid")
    if humanoid and not isTouched then
        isTouched = true
        task.wait(${fade})
        platform.Transparency = 1
        platform.CanCollide = false
        task.wait(3)
        platform.Transparency = 0
        platform.CanCollide = true
        isTouched = false
    end
end)`;
        instructionText.innerText = "Parkour platfromasi (Part) ichiga Script joylashtiring.";

    } else if (type === "leaderstats") {
        const name = document.getElementById("statName") ? document.getElementById("statName").value : "Coins";
        script = `-- ServerScriptService -> Leaderstats.luau
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local stat = Instance.new("IntValue")
    stat.Name = "${name}"
    stat.Value = 100
    stat.Parent = leaderstats
end)`;
        instructionText.innerText = "ServerScriptService ichiga Script shaklida joylashtiring.";
    }

    outputCode.textContent = script;
}

// "Skript Yaratish" button action: Creates/Downloads file & Copies to clipboard
function onGenerateButtonClick() {
    generateScript();
    const type = document.getElementById("scriptType").value;
    const code = document.getElementById("generatedCode").textContent;

    // 1. Copy code to clipboard
    navigator.clipboard.writeText(code);

    // 2. Download script file (.luau)
    const fileName = type.charAt(0).toUpperCase() + type.slice(1) + "Script.luau";
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 3. Show Toast notification
    showToast(`✅ "${fileName}" fayli yaratildi va kompyuterga yuklab olindi! (Kod nusxalandi)`);
}

// Floating Toast Notification
function showToast(message) {
    let toast = document.getElementById("toastNotification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toastNotification";
        toast.className = "toast-notification";
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}

// Copy generated script to clipboard
function copyGeneratedScript() {
    const code = document.getElementById("generatedCode").textContent;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById("copyBtn");
        btn.innerHTML = `<i class="fa-solid fa-check"></i> Nusxalandi!`;
        setTimeout(() => {
            btn.innerHTML = `<i class="fa-regular fa-copy"></i> Nusxalash`;
        }, 2000);
    });
}

function copyFullCombinedCode() {
    const code = document.getElementById("fullCombinedCode").textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert("Barcha skriptlar buferga nusxalandi!");
    });
}

// Modal functions
function openScriptModal(key) {
    const modal = document.getElementById("scriptModal");
    const title = document.getElementById("modalTitle");
    const code = document.getElementById("modalCode");

    if (scriptTemplates[key]) {
        title.innerText = scriptTemplates[key].title;
        code.textContent = scriptTemplates[key].code;
        modal.classList.add("show");
    }
}

function closeScriptModal() {
    document.getElementById("scriptModal").classList.remove("show");
}

function copyModalScript() {
    const code = document.getElementById("modalCode").textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert("Kod buferga nusxalandi!");
    });
}

// Accordion toggle
function toggleAccordion(header) {
    const item = header.parentElement;
    item.classList.toggle("active");
}

// Smooth scroll helper
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
    updateGeneratorFields();
});
