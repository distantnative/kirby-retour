<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit518cd2f437d72438d8709a2ebd885cc2
{
    public static $prefixLengthsPsr4 = array (
        'd' => 
        array (
            'distantnative\\Retour\\' => 21,
        ),
        'K' => 
        array (
            'Kirby\\' => 6,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'distantnative\\Retour\\' => 
        array (
            0 => __DIR__ . '/../..' . '/models',
        ),
        'Kirby\\' => 
        array (
            0 => __DIR__ . '/..' . '/getkirby/composer-installer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Kirby\\ComposerInstaller\\CmsInstaller' => __DIR__ . '/..' . '/getkirby/composer-installer/src/ComposerInstaller/CmsInstaller.php',
        'Kirby\\ComposerInstaller\\Installer' => __DIR__ . '/..' . '/getkirby/composer-installer/src/ComposerInstaller/Installer.php',
        'Kirby\\ComposerInstaller\\Plugin' => __DIR__ . '/..' . '/getkirby/composer-installer/src/ComposerInstaller/Plugin.php',
        'Kirby\\ComposerInstaller\\PluginInstaller' => __DIR__ . '/..' . '/getkirby/composer-installer/src/ComposerInstaller/PluginInstaller.php',
        'distantnative\\Retour\\Config' => __DIR__ . '/../..' . '/models/Config.php',
        'distantnative\\Retour\\Log' => __DIR__ . '/../..' . '/models/Log.php',
        'distantnative\\Retour\\Migrator' => __DIR__ . '/../..' . '/models/Migrator.php',
        'distantnative\\Retour\\Retour' => __DIR__ . '/../..' . '/models/Retour.php',
        'distantnative\\Retour\\Route' => __DIR__ . '/../..' . '/models/Route.php',
        'distantnative\\Retour\\Routes' => __DIR__ . '/../..' . '/models/Routes.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit518cd2f437d72438d8709a2ebd885cc2::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit518cd2f437d72438d8709a2ebd885cc2::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit518cd2f437d72438d8709a2ebd885cc2::$classMap;

        }, null, ClassLoader::class);
    }
}
