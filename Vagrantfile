Vagrant.configure(2) do |config|

#Using a clean ubuntu 14.04 VM from https://atlas.hashicorp.com/ubuntu
  config.vm.box = "ubuntu/trusty64"

  config.vm.box_check_update = true

#We are forwading port 4000 from the ubuntu vm to port 4000 on the host OS. This will allow you to see the app resolve at localhost:4000 on your host OS.
   config.vm.network "forwarded_port", guest: 4000, host: 4000

#By default we disable the gui on the vm as its not needed. We set the VM to have 1 GB of memmory and 1 CPU.
  config.vm.provider :virtualbox do |vb|
    vb.gui = false
    vb.memory = 1024
    vb.cpus = 1
  end

#This is where we are running all of our shell commands to install the dependencies, create folders, and install/start the app.
  config.vm.provision "shell", inline: <<-SHELL
#Updating the ubuntu libraries
    sudo apt-get update -qq
#Preparing the neccesary libraries and such to install mongodb and nodejs
    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
    sudo apt-get update -qq
#Installing git, nodejs, and mongodb
    sudo apt-get install -y git nodejs mongodb-org
#Cloning the repo
    git clone https://github.com/d48/mytestimony.git
#running npm install in the repo directory
    cd mytestimony && npm install
#Creating a db folder for mongodb. By default mongodb uses ./data/db/ for its database folder.
    mkdir ./data/ ./data/db/
#We are running the app in the backround and pumping the output to mytestimony.log
    sudo make startapp &>> mytestimony.log &

  SHELL
end
