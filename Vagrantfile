Vagrant.configure(2) do |config|


  config.vm.box = "ubuntu/trusty64"

  config.vm.box_check_update = true

   config.vm.network "forwarded_port", guest: 4000, host: 4000

  config.vm.provider :virtualbox do |vb|
    vb.gui = false
    vb.memory = 1024
    vb.cpus = 1
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update -qq
    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
    sudo apt-get update -qq

    sudo apt-get install -y git nodejs mongodb-org

    git clone https://github.com/d48/mytestimony.git

    cd mytestimony && npm install

    mkdir ./data/ ./data/db/

    sudo make startapp &>> mytestimony.log &

  SHELL
end
