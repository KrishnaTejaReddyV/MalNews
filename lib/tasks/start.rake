namespace :start do
    task :development do
      exec 'heroku local -f Procfile.dev -p 3000'
    end
  end
  
  desc 'Start development server'
  task :start => 'start:development'