package guichaguri.trackplayer.logic.services;

import android.content.Intent;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.media.MediaBrowserCompat.MediaItem;
import android.support.v4.media.MediaBrowserServiceCompat;
import android.util.Log;
import guichaguri.trackplayer.logic.MediaManager;
import guichaguri.trackplayer.logic.Utils;
import guichaguri.trackplayer.logic.components.MediaWrapper;
import java.util.Collections;
import java.util.List;

/**
 * The main service!
 * @author Guilherme Chaguri
 */
public class PlayerService extends MediaBrowserServiceCompat {

    public static final String ACTION_MEDIA_WRAPPER = "trackplayer.media.wrapper";

    private MediaManager manager;

    @Override
    public IBinder onBind(Intent intent) {
        if(intent.getAction().equals(ACTION_MEDIA_WRAPPER)) {
            Log.d(Utils.TAG, "Module Bound");

            if(intent.hasExtra("data")) {
                manager.setupPlayer(intent.getBundleExtra("data"));
            } else {
                manager.setupPlayer(null);
            }

            return new MediaWrapper(this, manager);
        }
        return super.onBind(intent);
    }

    @Nullable
    @Override
    public BrowserRoot onGetRoot(@NonNull String clientPackageName, int clientUid, @Nullable Bundle rootHints) {
        return new BrowserRoot("root", null);
    }

    @Override
    public void onLoadChildren(@NonNull String parentId, @NonNull Result<List<MediaItem>> result) {
        //TODO
        result.sendResult(Collections.<MediaItem>emptyList());
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(Utils.TAG, "Service command (" + (intent != null ? intent.getAction() : "Unknown") + ")");

        manager.onCommand(intent);

        return START_STICKY;
    }

    @Override
    public void onCreate() {
        Log.d(Utils.TAG, "Service init");

        super.onCreate();

        manager = new MediaManager(this);
    }

    @Override
    public void onDestroy() {
        Log.d(Utils.TAG, "Service destroy");

        manager.onServiceDestroy();
        manager = null;
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        Log.d(Utils.TAG, "Task removed");

        if(manager.shouldStopWithApp()) {
            stopSelf();
        }
    }
}
