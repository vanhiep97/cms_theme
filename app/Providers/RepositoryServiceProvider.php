<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use function PHPSTORM_META\map;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $models = [
            'User'
        ];
        foreach ($models as $model) {
            $this->app->singleton(
                "App\Repositories\{$model}RepositoryInterface",
                "App\Repositories\{$model}Repository"
            );
        }
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
